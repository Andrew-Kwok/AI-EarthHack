// chatgptService.js
const OpenAI = require("openai");
const fs = require('fs');

const openai = new OpenAI();
// if API key is not set up in the project
// const openai = new OpenAI("YOUR_API_KEY");
const gptModel = "gpt-3.5-turbo"; // "gpt-4";
const problemRegex = /Problem:\s*([^]+?)\.\s*Solution:/;
const scoreRegex = /Score:\s*(\d+(?:\.\d+)?)/;
const explanationRegex = /Explanation:\s*([^\.]+\.(\s+[^\.]+\.){0,1})/;
const background = 'You are a very strict critic who knows a lot about circular economy and sustainability. Your mark things very harsh. You rarely give marks that is above 8.0 \n'
const inputFormat = 'When evaluating user submissions, focus on the text immediately following "Problem:" and before "Solution:" for the problem statement. For the solution assessment, concentrate on the text that comes after "Solution:".\n'
const replyFormat = 'To evaluate the ideas presented, a score will be provided alongside a one sentence explanation. The score will reflect the quality and potential impact of the idea, ranging from 0.0 for ideas with little to no potential, up to 10.0 for groundbreaking ideas. The one sentence explanation will comment concisely on the strengths and weaknesses of the users presentation without reiterating their content. Avoid saying lacks details in explanation, focus on the idea itself compare with others. Format: Score: [X]\n Explanation: [Your Explanation] \n';

// load knowledge database
const sevenPillars = ['Materials', 'Energy', 'Water', 'Biodiversity', 'Society & Culture', 'Health & Wellbeing', 'Value', 'Other'];
let knowledgeBase = {'Materials': null, 'Energy': null, 'Water': null, 'Biodiversity': null, 'Society & Culture': null, 'Health & Wellbeing': null, 'Value': null, 'Other': null};
sevenPillars.forEach(function(pillar) {
    const filePath = 'services/knowledge/' + pillar + '.txt';

    fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
        n = pillar;
        // Use the file contents as needed
        knowledgeBase[pillar] = `${data}`;
        // console.log(pillar, knowledgeBase[pillar].slice(0, 10));
    });
});

// spam Filter
async function spamFilter(prompt) {
    const rolePlay =  'As a judge, your task is to evaluate each submission critically. A submission will be deemed "Valid" if the proposed solution aptly addresses the presented problem, demonstrates a thoughtful approach, and reflects a diligent effort. Conversely, a submission will be considered "Invalid" if the solution bears no clear relevance to the problem, is incoherent, or exhibits low effort — indicated by an incomplete development or a nonsensical proposition. Your judgment should categorically state whether the submission is "Valid" or "Invalid" based on these criteria.';
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: 'Problem: Plastic bottle. Solution: Encourage save energy'}, { role: 'system', content: 'Invalid'}, { role: 'user', content: 'Problem: Plastic bottle. Solution: Encourage recycle plastic bottle'}, { role: 'system', content: 'Valid'},{ role: 'user', content: prompt}],
        model: gptModel,
        max_tokens: 5,
        temperature: 0.0,
    });
    return completion.choices[0].message.content;
}

async function gptEval(prompt, pastMessage, evaluationGoal, rolePlay) {
    if (prompt === null) {
        console.log("JANCUK NULL", rolePlay)
    }

    let score = null;
    let explanation = null;
    let newMessage = pastMessage.concat([{ role: 'user', content: prompt}]);
    while (score === null || score < 0 || score > 10){
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: rolePlay }].concat(newMessage),
            model: gptModel,
            max_tokens: 100,
            temperature: 0.0,
        });
        // console.log(completion.choices[0].message.content);
        const aiResponse = completion.choices[0].message.content;
        const scoreMatch = aiResponse.match(scoreRegex);
        score = scoreMatch ? scoreMatch[1] : null;

        const explanationMatch = aiResponse.match(explanationRegex);
        explanation = explanationMatch ? explanationMatch[1].trim() : null;
    }

    return [score, explanation];
}

async function problemPopularEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay =  background + evaluationGoal + 'You are evaluating a problem. You do not care about solution at all. You only care about popularity (how many people are/will be impacted). You will rate on the popularity of the given information out of 10. Assign up to half of the points based on the sheer scale of the impact, considering factors such as the number of affected individuals, organizations, or communities. The remaining points should be awarded based on the depth and specificity of the users explanation about its popularity. General or vague explanations should receive minimal points. When scoring, provide a number between 0-10, taking into account both the quantitative reach and the quality of the explanation provided. Your assessment should be grounded in measurable metrics like the quantitative count of impacted stakeholders. Ensure the explanation is only one sentence, and it is specific and constructive, highlighting popularity. You DO NOT need to restate the any thing in the problem. Just give an one sentence constructive feedback that focused on the lack of the problem description. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function problemGrowingEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal + 'Your task is to assess the future potential and growth of a given problem, focusing on whether it will escalate over time and impact more people. You are to rate the problems potential on a scale of 0 to 10. Allocate half of the points based on the magnitude of the problem and the other half on the depth and clarity of the users explanation regarding the problems potential growth and increasing impact. Detailed explanations should be rewarded, while generic or vague descriptions should receive minimal points. Your assessment should not include any consideration of potential solutions, but it should highlight whether the problem is expected to grow over time. Base your evaluation on measurable metrics, such as the projected percentage increase in the frequency or incidence of the problem. Ultimately, your score should reflect an assessment of both the current scale and the potential expansion of the problem, with a number between 0-10. Ensure the one sentence explanation is specific to the problem and mention growing. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function problemUrgentEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal+ 'Your role is to evaluate the urgency of a presented problem, focusing exclusively on its immediate significance and the need for swift action. Rate the urgency on a scale of 0 to 10. Divide the scoring criteria equally between the overall severity of the problem and the detail in the users explanation about why the problem requires immediate attention. Generous scores should be assigned to well-explained, specific descriptions, whereas vague or overly general explanations should receive low scores. Remember, your evaluation should not consider any potential solutions but should strictly assess the urgency of the problem as described. Highlight the urgency in your explanation, basing your judgment on measurable metrics like time sensitivity and the speed at which the problem demands resolution. Your final score should reflect a balanced assessment of the problems current criticality and the users effectiveness in conveying this urgency, with a score ranging from 0 to 10. Ensure the one sentence explanation is specific to the problem and mention urgency. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function problemExpenseEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal + 'Your focus is on evaluating the economic impact of a problem, particularly on problems that are escalating over time and affecting more people. Rate the financial significance of the problem on a scale from 0 to 10. Allocate half of the points based on the magnitude of the problem and the other half on the users detailed explanation of its economic implications. Generous scores should be given to well-articulated, specific explanations, while vague or general descriptions should receive minimal scores. Remember, your evaluation should not include any potential solutions but should strictly assess the financial impact of the problem as described. Your explanation should underscore the economic urgency of the problem, focusing on measurable metrics such as the financial costs incurred due to inefficiencies, resource wastage, and other economic burdens. Provide a balanced score that reflects both the scale of the economic issue and the effectiveness of the users explanation, with a score ranging from 0 to 10. Ensure the one sentence explanation is specific to the problem and mention expense. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function problemFrequentEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal + 'Your task is to assess the frequency of a given problem, specifically focusing on issues that are recurrent and not one-time events. Evaluate the problems frequency on a scale from 0 to 10. Allocate half of the score based on the overall significance of the problem and the other half based on the users detailed explanation of its frequency. Generous scores should be given to detailed and specific descriptions, while vague or overly general explanations warrant lower scores. Remember, your assessment should solely focus on the frequency of the problem without considering any potential solutions. Highlight in your explanation whether the problem occurs frequently. Use measurable metrics such as the number of occurrences or frequency within a defined period (e.g., daily, monthly, yearly) to guide your scoring. Provide a score that reflects both the severity of the recurring issue and the clarity of the users explanation, with scores ranging from 0 to 10. Ensure the one sentence explanation is specific to the problem and mention frequency. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function solutionCompletenessEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal +'You are tasked with assessing the completeness of a solution in relation to a stated problem. Focus on whether the solution thoroughly addresses the problem detailed after "Problem:" and before "Solution:" in the users description. Examine if there is a coherent and relevant connection between the problem and the solution presented. The solution should be evaluated based on how effectively it solves the problem mentioned and its alignment with the problems context. Your assessment should consider the extent to which the solution completes the circular economy loop, a key measurable metric. This involves evaluating how well the solution contributes to a sustainable, closed-loop system where resources are reused, recycled, and conserved. Provide a score between 0 to 10, reflecting the degree of completeness and relevance of the solution to the problem. High scores should indicate a solution that fully addresses the problem and effectively contributes to the circular economy, while low scores suggest incomplete or irrelevant solutions. Ensure the one sentence explanation is specific to the solution and mention completeness. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat;
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function solutionTargetEval(prompt, pastMessage, evaluationGoal, category) {
    const task =  "Your task is to assess the alignment of a given concept with the knowledge. Assign a score on a scale from 0 to 10, where 0 indicates no alignment and 10 signifies complete adherence to the circular economy's principles. Provide a concise one-sentence explanation of your score, specifically addressing the solution and mentioning its alignment with the circular economy goals. How does this idea compare with other ideas existed in the world? Maintain consistency by assigning similar scores to similar concepts in the conversation. \n";
    const knowledge = Array.isArray(category) ? category.filter(c => c in sevenPillars).map(c => knowledgeBase[c]).join('') : '';
    const rolePlay = background + 'Knowledge: '+ knowledge + evaluationGoal + inputFormat + task + replyFormat;
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function solutionNoveltyEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal + inputFormat + 'Your task is to assess the creativity and novelty of a proposed solution. Determine if the solution is already in existence and evaluate its uniqueness. Measure the level of innovation by examining how the solution differs from existing alternatives. Focus on various aspects of innovation, including programmatic, technical, organizational, managerial, and methodological categories. Highlight the unique aspects of the solution and their potential to influence current practices or products. You will provide a score between 0 to 10, with 0 indicating no novelty and 10 indicating a highly creative and unprecedented solution. Your evaluation should reflect the distinctiveness of the solutions approach and its ability to introduce a new value proposition that could significantly impact the status quo. Ensure the one sentence explanation is specific to the solution and mention novelty. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat;
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function solutionFinImpactEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal + inputFormat + 'Your role is to evaluate the financial impact of a proposed solution. Analyze its potential to generate monetary value and contribute to economic growth or savings. Consider the direct financial benefits, cost savings, revenue generation, and long-term financial sustainability of the solution.Provide a score from 0 to 10 based on the solutions capacity to create monetary value. A score of 0 would indicate no financial impact, while a score of 10 would signify a solution with significant potential for financial returns or savings. Your assessment should reflect the economic viability and potential profitability of the solution in question. Ensure the one sentence explanation is specific to the solution and mention the financial impact. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat;
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

async function solutionImplementabilityEval(prompt, pastMessage, evaluationGoal) {
    const rolePlay = background + evaluationGoal + inputFormat + 'Your role is to evaluate the implementability of a proposed solution, focusing specifically on its feasibility and scalability. You should consider the solutions alignment with market size indicators including Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM). Analyze the provided financial projections, such as initial and ongoing costs, revenue forecasts, projected profit margins, the break-even point, and Return on Investment (ROI).Provide a rating between 0 to 10 based on these factors, where 0 indicates a solution with low feasibility and scalability, and 10 represents a highly feasible and scalable solution with strong financial prospects. Your score should comprehensively reflect the practicality of the solution and its potential for market success. Ensure the one sentence explanation is specific to the solution and mention the implementability. For similar ideas in the conversation, assign a similar score to maintain consistency.' + replyFormat;
    return gptEval(prompt, pastMessage, evaluationGoal, rolePlay);
}

// creative name
async function generateName(prompt, pastMessage) { 
    const rolePlay = 'You possess a knack for creativity! Your challenge is to concoct a name consisting of 1 to 4 words that encapsulates the essence of the provided information. Your response should exclusively contain the name you have crafted, devoid of any additional commentary or explanation. Let your imagination lead the way to a succinct and resonant title. Do not show anyname that already appeared in the previous conversation.';

    let n = null;
    let attempts = 0;
    const maxAttempts = 5;
    let newMessage = pastMessage.concat([{ role: 'user', content: prompt}]);

    while (n === null && attempts < maxAttempts) {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: rolePlay }].concat(newMessage),
            model: gptModel,
            max_tokens: 10,
            temperature: 0.0,
        });

        const nameRegex = /^(\b\w+\b(?:\s+\b\w+\b){0,3})/;
        const aiResponse = completion.choices[0].message.content;
        const nameMatch = aiResponse.match(nameRegex);
        n = nameMatch ? nameMatch[1].trim() : null;
        attempts++;
    }

    if (n === null || n === 'undefined') {
        n = "Default Name"; // Fallback name if none is generated
    }

    return n;
}

// generate tags
async function generateTags(prompt) { 
    const rolePlay = "Categorize the given problem and solution into one or two of the following 7 pillars of circular economy (choose the best fit ones). If they do not clearly fit into any of these categories, categorize them as 'Other'. The categories are: 1. Materials; 2.Energy; 3.Water; 4.Biodiversity; 5.Society and Culture; 6.Health and Wellbeing; 7. Value. No explanation is needed. Just give the categories."
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: gptModel,
        max_tokens: 10,
        temperature: 0.0,
    });

    const aiResponse = completion.choices[0].message.content;
    return categorize(aiResponse)
}

function categorize(input) {
    const categories = [
        { name: "Materials", regex: /Materials/i },
        { name: "Energy", regex: /Energy/i },
        { name: "Water", regex: /Water/i },
        { name: "Biodiversity", regex: /Biodiversity/i },
        { name: "Society & Culture", regex: /Society and Culture/i },
        { name: "Health & Wellbeing", regex: /Health and Wellbeing/i },
        { name: "Value", regex: /Value/i }
    ];

    let cat = "";
    for (const category of categories) {
        if (category.regex.test(input)) {
            if (cat === ""){
                cat = category.name;
            } else {
                cat = cat + ", " + category.name;
                break;
            }
        }
    }

    return cat === "" ? 'Other' : cat;
}

// overall summary
async function generateSummary(prompt) { 
    const rolePlay = 'Your task is to distill the essence of the given information into a concise, one-sentence summary. The structure of your response should be as follows: "Summary: [insert your succinct, clear, and comprehensive summary here in one sentence]." This summary should capture the key points or the central theme of the provided information, presented in a brief and coherent manner.';

    let sentence = null;
    while (sentence === null){
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
            model: gptModel,
            max_tokens: 60,
            temperature: 0.0,
        });

        const firstSentenceRegex = /Summary:\s*([^\.]+\.)/;
        const aiResponse = completion.choices[0].message.content;
        const sentenceMatch = aiResponse.match(firstSentenceRegex);
        sentence = sentenceMatch? sentenceMatch[1].trim() : null;
    }

    return sentence;
}

// function main() {
//     const p1 = 'Problem: Plastic bottle. Solution: Encourage save energy';
//     const result = problemPopularEval(p1, [], '');
//     result.then((value) => {
//         console.log(value);
//     });
// }
//
// main();

module.exports = {spamFilter, problemPopularEval, problemGrowingEval, problemUrgentEval, problemExpenseEval, problemFrequentEval, solutionCompletenessEval, solutionTargetEval, solutionNoveltyEval, solutionFinImpactEval, solutionImplementabilityEval, generateName, generateTags, generateSummary};