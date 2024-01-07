// // chatgptService.js
const { response } = require("express");
const OpenAI = require("openai");

const openai = new OpenAI();
// if API key is not set up in the project
// const openai = new OpenAI("YOUR_API_KEY");

const problemRegex = /Problem:\s*([^]+?)\.\s*Solution:/;
const scoreRegex = /Score:\s*(\d+(?:\.\d+)?)/;
const explanationRegex = /Explanation:\s*([^\.]+\.)/;
const background = 'You are a very strict critic who knows a lot about circular economy and sustainability.'
const inputFormat = 'The format of the user input is yhat problem is after Problem: and before Solution:. Solution is everything after Solution:'
const replyFormat = 'The format of your reply must be Score: (number with one digit after the decimal from 0.0 to 10.0 where 10 means it is the best idea on the planet, 50 is just an average idea. Marks will be detucted if the given information is not descriptive enough. For example, if the problem description is just 5 words, it is probably too general so the mark should be realy low.). Explaination: (only one concise senetnce to comment on what does the user did well on and what does the user did bad on. you must not repeat what the user said)';

// problem popularity evaluation
async function problemPopularEval(prompt) { 
    rolePlay =  background + 'You only care about popularity (how many people are/will be impacted). You will rate on the popularity of the given information out of 100. Half of the points should given on the big idea of the given information, and half of the points should given on how detailed the user explain its popularity. If the user only give a gneral idea, no or very little marks will be given.' + replyFormat
    const problemMactch = prompt.match(problemRegex);
    const problemDescription = problemMactch ? problemMactch[1].trim() : null;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: problemDescription}],
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log(problemDescription);
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

// problem growing evaluation
async function problemGrowingEval(prompt) { 
    rolePlay = background + 'You only care about the future/ potential (will the issue grow with the time and impact more people). A problem desciption is given to you. You will rate on the potential of the problem out of 100. Half of the points should given on the big problem is, and half of the points should given on how detailed the user explain popularity of the problem. If the user only give a general idea, no or very little marks will be given. No solution is required for the problem so do not talk about missing one in the explaination. Mention if the problem is/will be growing in the explaination.' + replyFormat
    const problemMactch = prompt.match(problemRegex);
    const problemDescription = problemMactch ? problemMactch[1].trim() : null;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: problemDescription}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log(problemDescription);
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

// problem urgent evaluation
async function problemUrgentEval(prompt) { 
    rolePlay = background + 'You only care about the urgency (it is a really big issue that we must pay attention right now). A problem desciption is given to you. You will rate on the urgency of the problem out of 100. Half of the points should given on the big problem is, and half of the points should given on how detailed the user explain why the problem is urgent. If the user only give a general idea, no or very little marks will be given. No solution is required for the problem so do not talk about missing one in the explaination. Mention if the problem is urgent in the explaination.' + replyFormat
    const problemMactch = prompt.match(problemRegex);
    const problemDescription = problemMactch ? problemMactch[1].trim() : null;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: problemDescription}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log(problemDescription);
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

// problem expense evaluation
async function problemExpenseEval(prompt) {
    rolePlay = background + 'You only care about the money. You only like a problem that will grow with the time and more people will have the problem). A problem desciption is given to you. You will rate on the urgency of the problem out of 100. Half of the points should given on the big problem is, and half of the points should given on how detailed the user explain why the problem is api. If the user only give a general idea, no or very little marks will be given. No solution is required for the problem so do not talk about missing one in the explaination. Mention if the problem is urgent in the explaination.' + replyFormat
    const problemMactch = prompt.match(problemRegex);
    const problemDescription = problemMactch ? problemMactch[1].trim() : null;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: problemDescription}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log(problemDescription);
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

// problem frequent evaluation
async function problemFrequentEval(prompt) {
    rolePlay = background + 'You only about how frequesnt the problem happen, ex is it a daily issue. You only like a problem that is not a one-time problem, people come across the problem frequently. A problem desciption is given to you. You will rate on the urgency of the problem out of 100. Half of the points should given on the big problem is, and half of the points should given on how detailed the user explain why the problem is api. If the user only give a general idea, no or very little marks will be given. No solution is required for the problem so do not talk about missing one in the explaination. Mention if the problem is frequently happen in the explaination.' + replyFormat
    const problemMactch = prompt.match(problemRegex);
    const problemDescription = problemMactch ? problemMactch[1].trim() : null;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: problemDescription}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log(problemDescription);
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

//solution completeness evaluation
async function solutionCompletenessEval(prompt) { 
    rolePlay = background + 'Is the solution complete? Can it solve the problem described after Problem:? Are the problem and soluation even related? Note that problem is after Problem: and before Solution: and solution is everything after Solution:' + replyFormat;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

//solution completeness evaluation
async function solutionCompletenessEval(prompt) { 
    rolePlay = background + inputFormat + 'Is the solution complete? Can it solve the problem described after Problem:? Are the problem and soluation even related?' + replyFormat;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

//solution target evaluation
async function solutionTargetEval(prompt) { 
    rolePlay = background + inputFormat + 'Does it fit the 7 pillars of circular econ.' + replyFormat;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

//solution novelty evaluation
async function solutionNoveltyEval(prompt) { 
    rolePlay = background + inputFormat + 'How creative is the solution? Does it exist already?' + replyFormat;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

//solution financial impact evaluation
async function solutionFinImpactEval(prompt) { 
    rolePlay = background + inputFormat + 'What is the financial impact? Does it create monetary value?' + replyFormat;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

//solution Implementability evaluation
async function solutionImplementabilityEval(prompt) { 
    rolePlay = background + inputFormat + 'What is the implementability? How feasible is the solution? How scalabale is the solution?' + replyFormat;
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 60,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    const scoreMatch = aiResponse.match(scoreRegex);
    const explanationMatch = aiResponse.match(explanationRegex);

    const score = scoreMatch ? scoreMatch[1] : null;
    const explanation = explanationMatch ? explanationMatch[1].trim() : null;
    console.log("score: " + [score, explanation][0]);
    console.log([score, explanation]);
    return [score, explanation];
    // return completion.choices[0].message.content;
}

// creative name
async function generateName(prompt) { 
    rolePlay = "You are a creative thinker! Make up a name with only 2 to 4 words for the given info. Just give me the name, nothing else!";
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 10,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const nameRegex = /^(\b\w+\b(?:\s+\b\w+\b){1,3})/;
    const aiResponse = completion.choices[0].message.content;
    const nameMatch = aiResponse.match(nameRegex);
    const name = nameMatch ? nameMatch[1].trim() : null;
    
    // console.log(name);
    return name;
    // return completion.choices[0].message.content;
}

// generate tags
async function generateTags(prompt) { 
    rolePlay = "Categorize the given problem and solution into one or two of the following 7 pillars of circular economy. If they do not clearly fit into any of these categories, categorize them as 'Other'. The categories are: 1. Design for Longevity and Durability; 2. Maintain and Extend Product Life; 3. Reuse and Re-purpose; 4. Recycle and Recover; 5. Reduce Waste and Minimise Resource Use; 6. Shift to Sustainable Materials; 7. Embrace Digitalisation and Sharing."
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 10,
        temperature: 0.0,
    });
    console.log(completion.choices[0].message.content);
    const aiResponse = completion.choices[0].message.content;
    tags = categorize(aiResponse)
    
    // console.log(categorize('Design for Longevity and Durability, Recycle and Recover'));
    // console.log(categorize(aiResponse));
    return categorize(aiResponse);
    // return completion.choices[0].message.content;
}

function categorize(input) {
    const categories = [
        { name: "Design for Longevity and Durability", regex: /longevity|durability/i },
        { name: "Maintain and Extend Product Life", regex: /maintain|extend|product life/i },
        { name: "Reuse and Re-purpose", regex: /reuse|re-purpose/i },
        { name: "Recycle and Recover", regex: /recycle|recover/i },
        { name: "Reduce Waste and Minimise Resource Use", regex: /reduce waste|minimise resource/i },
        { name: "Shift to Sustainable Materials", regex: /sustainable materials/i },
        { name: "Embrace Digitalisation and Sharing", regex: /digitalisation|sharing/i }
    ];
    cate = [];

    for (const category of categories) {
        if (category.regex.test(input)) {
            cate.push(category.name);
        }
    }
    if (cate == []) {
        return ["other"];
    }

    return  cate;
}

// overall summary
async function generateSummary(prompt) { 
    rolePlay = "You are provided with a problem and a solution. Your task is to provide a one sentence summary. ";
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: rolePlay }, { role: 'user', content: prompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        temperature: 0.0,
    });
    const firstSentenceRegex = /Summary:\s*([^\.]+\.)/;
    const aiResponse = completion.choices[0].message.content;
    const sentenceMatch = aiResponse.match(firstSentenceRegex);
    const sentence = sentenceMatch? sentenceMatch[1].trim() : null;
    
    console.log(sentence);
    return sentence;
    // return completion.choices[0].message.content;
}

p = 'Problem: Create Awareness of the propensity of Reduce, Reuse, Brick building. Solution: Our solution to this is to transform the way we consume fashion through the creation of a shared fashion platform â€“ a fashion library. The fashion library will function on the concept of lending versus owning'
// problemPopularEval(p)
// problemGrowingEval(p)
// problemUrgentEval(p)
// problemExpenseEval(p)
// problemFrequentEval(p)
// solutionCompletenessEval(p)
// solutionTargetEval(p)
// solutionNoveltyEval(p)
// solutionFinImpactEval(p)
// solutionImplementabilityEval(p)
// generateName(p)
// generateTags(p)
// generateSummary(p);

module.exports = {problemPopularEval, problemGrowingEval, problemUrgentEval, problemExpenseEval, problemFrequentEval, solutionCompletenessEval, solutionTargetEval, solutionNoveltyEval, solutionFinImpactEval, solutionImplementabilityEval, generateName, generateTags, generateSummary};

