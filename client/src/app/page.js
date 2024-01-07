"use client";
import './globals.css';
import { useState } from 'react';

import largeButtonHTML from '../components/large_buttons'; // Replace this import with the correct path

export default function Home() {

        return (
            <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white' }}>
                <div style={{ width: '1512px', height: '982px', left: 0, top: 0, position: 'absolute' }}>
                <div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
        <div style={{width: 1512, height: 982, left: 0, top: 0, position: 'absolute'}}>
            <div style={{width: 1512, height: 982, left: 0, top: 0, position: 'absolute', background: '#88C4A6'}} />
            <div style={{width: 555, height: 555, left: -114, top: 35, position: 'absolute', borderRadius: 9999}} />
            <div style={{left: 570, top: 333, position: 'absolute', color: 'white', fontSize: 40, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 60, wordWrap: 'break-word'}}>Welcome to Arbor!</div>
            <div style={{width: 618, left: 447, top: 504, position: 'absolute'}}><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">💪 </span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'">Make</span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'"> </span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'">informed choices</span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">, </span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'">fast</span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">! </span><span style="color: '#EFEFEF', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">We harness the power of AI to create data-backed analysis, unearth trends, and spot opportunities<br/></span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">🎯 </span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'">Tailor-made</span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'"> </span><span style="color: '#EFEFEF', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">evaluation is our jam. You're the director! Pick the metrics that matter to your vision – because your idea, your rules.<br/></span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">🌈 </span><span style="color: '#EFEFEF', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">Say goodbye to dull spreadsheets! We leverage</span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'"> </span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'">data visualization</span><span style="color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'"> </span><span style="color: '#EFEFEF', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'">to highlight your idea's potential and weak points<br/></span></div>
            <div style={{width: 124, height: 124, left: 694, top: 175, position: 'absolute'}}>
                <div style={{width: 124, height: 124, left: 0, top: 0, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
                <img style={{width: 126.73, height: 132.18, left: -0, top: -3.41, position: 'absolute'}} src="https://via.placeholder.com/127x132" />
            </div>
            <div style={{width: 698, left: 407, top: 408, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'}}>Ever wished for an AI genie to make your evaluation process more streamlined, efficient and unbiased? Say hello to Arbor – your co-pilot on the journey to identify the next big idea.</div>
        </div>
        {/* PUT LARGE BUTTON HERE - <div style={{width: 218, height: 60, left: 647, top: 734, position: 'absolute'}}>
            <div style={{width: 218, height: 60, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 10, border: '1.50px #98C26C solid'}} />
            <div style={{left: 29, top: 16, position: 'absolute', textAlign: 'center', color: '#728F4F', fontSize: 18, fontFamily: 'Lexend Deca', fontWeight: '700', lineHeight: 27, wordWrap: 'break-word'}}>Try out the magic</div>
        </div> */}
    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: largeButtonHTML }} />
            </div>
        )
    
    
}