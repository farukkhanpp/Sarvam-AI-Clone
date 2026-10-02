import{j as t}from"./jsx-runtime.u17CrQMm.js";import{r as n}from"./index.DUTUzmOK.js";import{D as le,z as G,E as ue,F as de}from"./posthogTracking.BYGPnSs7.js";import{P as fe}from"./PlaygroundCTA.CU39x8vu.js";import{q as me,Q as ge,e as he,c as pe}from"./guarded-fetch.BPwLQ9C_.js";import xe from"./CustomButton.DmcZeIki.js";import{c as ve,a as we}from"./webAudio.BSSDy_4r.js";import{H as q}from"./HugeiconsIcon.M9kuHKIB.js";import{M as K}from"./Mic01Icon.DsyfeLsh.js";import{T as be}from"./Tick01Icon.CMS0_aRT.js";import{C as ye}from"./Copy01Icon.SfYHAEjm.js";const Se=({isRecording:v})=>{const g=n.useRef(null),h=n.useRef(null),w=n.useRef(v),f=n.useRef(v?1:0),b=n.useRef(0);return n.useEffect(()=>{w.current=v},[v]),n.useEffect(()=>{const i=g.current;if(!i)return;const e=i.getContext("webgl");if(!e)return;const P=`
            attribute vec2 aPosition;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `,C=`
            precision highp float;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform float uIsRecording;

            vec3 white = vec3(1.0, 1.0, 1.0);
            
            // Brand indigo colors
            vec3 indigo = vec3(0.506, 0.627, 0.914);   // #81a0e9 (sr-indigo-400)
            vec3 indigoLight = vec3(0.824, 0.875, 0.976);  // #d2dff9 (sr-indigo-200)

            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;
                
                float timeVal = iTime;
                float amplitudeMult = mix(1.0, 1.8, uIsRecording);
                
                // Noise for organic variation
                float n1 = noise(vec2(uv.x * 2.0 + timeVal * 0.1, 0.0));
                float n2 = noise(vec2(uv.x * 3.0 - timeVal * 0.15, 1.0));
                float n3 = noise(vec2(uv.x * 1.5 + timeVal * 0.08, 2.0));
                
                // Wave layers - smooth, gentle wave shapes
                float waveHeight = 0.0;
                
                // Primary wave - slow, gentle
                waveHeight += sin(uv.x * 5.0 + timeVal * 0.4 + n1 * 1.5) * 0.038;
                // Secondary wave - medium
                waveHeight += sin(uv.x * 8.0 - timeVal * 0.5 + n2 * 1.2) * 0.025;
                // Tertiary wave - subtle variation
                waveHeight += sin(uv.x * 12.0 + timeVal * 0.6 + n3) * 0.016;
                // Organic noise layer
                waveHeight += (n1 - 0.5) * 0.02;
                
                waveHeight *= amplitudeMult;
                
                // Thin base height
                float baseHeight = 0.1;
                
                // The wave edge
                float waveEdge = baseHeight + waveHeight;
                
                // Distance from wave edge
                float distFromWave = uv.y - waveEdge;
                
                // Tighter spread
                float blurWidth = 0.2;
                float waveMask = 1.0 - smoothstep(-0.03, blurWidth, distFromWave);
                
                // Soft color - light indigo gradient
                vec3 color = mix(indigoLight, indigo * 0.4 + indigoLight * 0.6, waveMask * 0.35);
                
                // Add subtle grain/noise texture
                float grain = noise(uv * iResolution.xy * 0.4) * 0.035;
                color += (grain - 0.0175);
                
                // Shimmer when recording
                float shimmer = noise(uv * 8.0 + timeVal * 0.2);
                color += (shimmer - 0.5) * 0.025 * uIsRecording;
                
                // Intensity
                float intensity = mix(0.5, 0.8, uIsRecording);
                
                gl_FragColor = vec4(mix(white, color, waveMask * intensity), 1.0);
            }
        `,H=(d,R)=>{const m=e.createShader(R);return e.shaderSource(m,d),e.compileShader(m),e.getShaderParameter(m,e.COMPILE_STATUS)?m:(console.error(e.getShaderInfoLog(m)),null)},y=H(P,e.VERTEX_SHADER),_=H(C,e.FRAGMENT_SHADER);if(!y||!_)return;const u=e.createProgram();e.attachShader(u,y),e.attachShader(u,_),e.linkProgram(u),e.useProgram(u);const z=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),F=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,F),e.bufferData(e.ARRAY_BUFFER,z,e.STATIC_DRAW);const L=e.getAttribLocation(u,"aPosition");e.enableVertexAttribArray(L),e.vertexAttribPointer(L,2,e.FLOAT,!1,0,0);const j=e.getUniformLocation(u,"iResolution"),U=e.getUniformLocation(u,"iTime"),S=e.getUniformLocation(u,"uIsRecording"),B=()=>{const d=Math.min(window.devicePixelRatio||1,2);i.width=i.clientWidth*d,i.height=i.clientHeight*d,e.viewport(0,0,i.width,i.height),e.uniform2f(j,i.width,i.height)};B(),window.addEventListener("resize",B);let $=performance.now();const c=()=>{const d=performance.now(),R=(d-$)/1e3;$=d;const m=w.current?1:0,E=.8,A=m-f.current,T=A*R*E*(1+Math.abs(A));f.current+=Math.sign(A)*Math.min(Math.abs(T),Math.abs(A)),b.current+=R*f.current,e.uniform1f(U,b.current),e.uniform1f(S,f.current),e.drawArrays(e.TRIANGLES,0,6),h.current=requestAnimationFrame(c)};return c(),()=>{window.removeEventListener("resize",B),h.current&&cancelAnimationFrame(h.current),e.deleteProgram(u),e.deleteBuffer(F)}},[]),t.jsx("canvas",{ref:g,className:"z-[1] absolute inset-0 w-full h-full"})};function Z({variant:v="primary",size:g="md",loading:h=!1,loadingText:w="Loading...",fullWidth:f=!1,disabled:b,children:i,className:e="",leftIcon:P,...C}){return t.jsx(xe,{variant:v,size:g,disabled:b||h,leftIcon:h?void 0:P,className:`${f?"w-full justify-center":""} ${e}`,...C,children:h?w:i})}function Re({message:v,placement:g="inline",className:h=""}){const w=g==="overlay"?"top-4 right-4 left-4 z-30 absolute":"shrink-0";return t.jsx("div",{className:`bg-red-50 px-4 py-3.5 border border-red-200 rounded-xl ${w} ${h}`,children:t.jsx("p",{className:"font-matter text-red-700 text-sm",children:v})})}const J=16e3,Te=J*.5,Ae=3,Ee=1e3;function ze({className:v="",languageName:g,embedded:h=!1,actionCta:w}){const[f,b]=n.useState(!1),[i,e]=n.useState(""),[P,C]=n.useState(0),[H,y]=n.useState(null),[_,u]=n.useState(""),[z,F]=n.useState(!1),[L,j]=n.useState(!1),[U,S]=n.useState(!1),[B,$]=n.useState(!1),c=n.useRef(null),d=n.useRef(null),R=n.useRef(null),m=n.useRef(null),E=n.useRef(null),A=n.useRef(null),T=n.useRef(new Float32Array(0)),D=n.useRef(!1),p=n.useRef(!1),W=n.useRef(0),Q=n.useRef(null),O=n.useRef(!1),I=i||_;n.useEffect(()=>{A.current&&I&&(A.current.scrollTop=A.current.scrollHeight)},[I]),n.useEffect(()=>()=>{E.current&&clearInterval(E.current),O.current=!0,N()},[]);const N=()=>{p.current=!1,m.current&&(m.current.dispose(),m.current=null),d.current&&(d.current.close(),d.current=null),R.current&&(R.current.getTracks().forEach(r=>r.stop()),R.current=null),c.current&&(c.current.close(),c.current=null),T.current=new Float32Array(0),D.current=!1},ee=r=>{const s=new Int16Array(r.length);for(let o=0;o<r.length;o++){const a=Math.max(-1,Math.min(1,r[o]));s[o]=a<0?a*32768:a*32767}return s},te=r=>{if(!c.current||c.current.readyState!==WebSocket.OPEN)return;const s=new ArrayBuffer(r.byteLength);new Int16Array(s).set(r);const o=new Blob([s],{type:"audio/wav"}),a=new FileReader;a.onloadend=()=>{const l={audio:{data:a.result.split(",")[1],encoding:"audio/wav",sample_rate:J}};c.current?.send(JSON.stringify(l)),D.current=!0},a.readAsDataURL(o)},re=async(r,s)=>{m.current=await we(r,s,o=>{if(!p.current)return;const a=new Float32Array(T.current.length+o.length);if(a.set(T.current),a.set(o,T.current.length),T.current=a,T.current.length>=Te&&c.current?.readyState===WebSocket.OPEN){const k=ee(T.current);T.current=new Float32Array(0),te(k)}})},X=r=>new Promise((s,o)=>{const a=new WebSocket(r);c.current=a,a.onopen=()=>{W.current=0,s(a)},a.onmessage=k=>{const l=JSON.parse(k.data);if(l.type==="data"){const M=l.data.transcript.replace(/<nospeech>/gi,"").replace(/<\/nospeech>/gi,"").trim();M&&(u(M),e(Y=>Y?`${Y} ${M}`:M),$(!0))}else if(l.type==="events"){const x=l.data?.signal_type;x==="START_SPEECH"?S(!0):x==="END_SPEECH"&&S(!1)}else if(l.type==="error"){const x=l.data.message||l.data.error;x?.includes("Cannot flush")||(G({surface:"stt",stage:"websocket",source:"client",error_code:l.data.code?String(l.data.code):void 0,message:x?String(x):"STT server error",component:"STTPlayground"}),y(`${l.data.code||"Error"}: ${x}`))}},a.onerror=()=>{o(new Error("WebSocket connection error"))},a.onclose=()=>{if(O.current){p.current=!1,b(!1),j(!1),S(!1);return}p.current&&W.current<Ae?(W.current++,setTimeout(()=>{!p.current||!Q.current||X(Q.current).then(k=>{d.current&&R.current&&(c.current=k)}).catch(()=>{G({surface:"stt",stage:"websocket",source:"client",error_code:"reconnect_exhausted",message:"Connection lost after reconnect attempts",component:"STTPlayground"}),y("Connection lost. Please try again."),b(!1),p.current=!1,S(!1),N()})},Ee*W.current)):p.current&&(G({surface:"stt",stage:"websocket",source:"client",error_code:"connection_lost",message:"WebSocket closed without successful reconnect",component:"STTPlayground"}),y("Connection lost. Please try again."),p.current=!1,b(!1),j(!1),S(!1),N())}}),ne=async()=>{if(me("stt")<=0){y(ge);return}j(!0),y(null),e(""),u(""),S(!1),D.current=!1,p.current=!1,O.current=!1,W.current=0;try{const r=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,noiseSuppression:!0,sampleRate:J}});R.current=r;const s=ve({sampleRate:J,latencyHint:"interactive"});d.current=s,s.state==="suspended"&&await s.resume();const o=new URLSearchParams({"language-code":"unknown",model:"saaras:v4",mode:"transcribe",vad_signals:"true",high_vad_sensitivity:"true"}),a="",k=window.location.protocol==="https:"?"wss:":"ws:",l=a?new URL(a).host:window.location.host,x=`${k}//${l}/api/playground/stt-ws?${o}`;Q.current=x,await he(),await X(x),pe("stt"),await re(s,r),j(!1),b(!0),p.current=!0,C(0),E.current=setInterval(()=>{C(M=>M+1)},1e3),le()}catch(r){const s=r instanceof Error?r.message:"Failed to access microphone. Please grant permission.";{const o=r instanceof Error&&(r.name==="NotAllowedError"||r.name==="NotFoundError"||s.toLowerCase().includes("microphone")||s.toLowerCase().includes("permission")),a=r instanceof Error&&s.includes("WebSocket");G({surface:"stt",stage:o?"get_user_media":a?"websocket":"http",source:"client",message:s,component:"STTPlayground"})}y(s),j(!1),N()}},se=()=>{ue(P,(i||_||"").length),b(!1),p.current=!1,O.current=!0,S(!1),c.current&&c.current.readyState===WebSocket.OPEN&&D.current?(c.current.send(JSON.stringify({type:"flush"})),setTimeout(()=>{N()},500)):N(),E.current&&(clearInterval(E.current),E.current=null)},ae=()=>{e(""),u(""),C(0),y(null),S(!1),$(!1)},oe=async()=>{const r=i||_;if(r)try{await navigator.clipboard.writeText(r),F(!0),de(r.length),setTimeout(()=>F(!1),2e3)}catch{}},ie=r=>{const s=Math.floor(r/60),o=r%60;return`${s.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`},V=(I?I.replace(/([.!?])\s+/g,`$1
`):"").split(`
`).filter(r=>r.trim()!==""),ce=h?"h-[460px] md:h-[620px]":"h-[620px] rounded-xl md:rounded-2xl border border-st-secondary";return t.jsxs("div",{className:`relative flex flex-col overflow-hidden w-full bg-sf ${ce} ${v}`,children:[t.jsxs("div",{className:"relative flex flex-col flex-1 min-h-0 m-2 bg-sf-secondary border border-st-secondary rounded-lg md:rounded-xl shadow-[0_2px_6px_rgba(31,31,31,0.03)] overflow-hidden",children:[t.jsx("div",{className:"absolute inset-0 opacity-30",style:{backgroundImage:"radial-gradient(circle, #cbd5e1 1px, transparent 1px)",backgroundSize:"32px 32px"}}),H&&t.jsx(Re,{message:H,placement:"overlay"}),t.jsx(Se,{isRecording:f}),t.jsx("div",{className:"z-10 relative flex flex-1 min-h-0 justify-center items-center w-full p-6 md:p-10",children:I?t.jsx("div",{className:"absolute inset-x-4 md:inset-x-8 top-6 md:top-8 bottom-32 flex flex-col overflow-hidden",style:{maskImage:"linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",WebkitMaskImage:"linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)"},children:t.jsx("div",{ref:A,className:"flex flex-col justify-end gap-4 md:gap-6 mx-auto px-[4%] w-full max-w-3xl h-full overflow-y-auto scroll-smooth pb-4",style:{scrollbarWidth:"none",msOverflowStyle:"none"},children:V.length>0?V.map((r,s)=>{const o=V.length-1-s,a=Math.max(.2,1-o*.15);return t.jsx("p",{className:`font-matter text-xl md:text-3xl font-normal text-center leading-relaxed transition-all duration-500 w-full shrink-0 ${s===V.length-1&&f?"text-sr-indigo-700 scale-105":"text-tx"}`,style:{opacity:a},children:r},s)}):t.jsx("p",{className:"w-full font-matter font-normal text-tx text-xl md:text-2xl text-center leading-relaxed whitespace-pre-wrap shrink-0",children:I})})}):t.jsx("h3",{className:"relative z-10 px-4 max-w-md font-matter font-medium text-tx text-2xl md:text-3xl text-center leading-relaxed",children:g?`Speak ${g} to see live captions`:"Speak to see live captions"})}),t.jsxs("div",{className:"absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center gap-3",children:[i&&!f&&t.jsxs(t.Fragment,{children:[t.jsx(Z,{onClick:ae,leftIcon:t.jsx(q,{icon:K,size:20,className:"text-white"}),children:"Record again"}),t.jsx("button",{onClick:oe,className:"flex justify-center items-center bg-sf hover:bg-sf-secondary p-3 border border-st-secondary rounded-full text-tx-tertiary transition-all shadow-sm",title:z?"Copied!":"Copy transcript",children:z?t.jsx(q,{icon:be,size:20,className:"text-green-600"}):t.jsx(q,{icon:ye,size:20,className:"text-tx-tertiary"})})]}),f&&t.jsxs("div",{className:"flex items-center gap-3 md:gap-4 bg-sr-indigo-50 px-4 md:px-6 py-3 md:py-4 border border-sr-indigo-100 rounded-full shadow-sm",children:[t.jsx("span",{className:"font-matter font-medium text-sr-indigo-500 text-sm",children:ie(P)}),t.jsx("div",{className:"flex items-center gap-1 h-8",children:Array.from({length:16}).map((r,s)=>{const o=U?4+Math.random()*20:4+Math.random()*4;return t.jsx("div",{className:`rounded-full w-[1.5px] animate-pulse ${U?"bg-sr-indigo-500":"bg-sr-indigo-200"}`,style:{height:`${o}px`,animationDelay:`${s*.05}s`,transition:"height 150ms ease, background-color 300ms ease"}},s)})}),t.jsx("button",{onClick:se,className:"flex justify-center items-center bg-white hover:bg-red-50 border border-sr-indigo-100 rounded-full w-10 h-10 transition-all",children:t.jsx("div",{className:"bg-red-500 rounded-sm w-4 h-4"})})]}),!i&&!f&&!L&&t.jsx(Z,{variant:"secondary",onClick:ne,className:"py-4 border border-st shadow-sm",leftIcon:t.jsx(q,{icon:K,size:22,className:"text-tx"}),children:g?`Start speaking in ${g}`:"Start speaking"}),L&&t.jsxs("div",{className:"flex items-center gap-3 bg-sr-indigo-50 px-6 py-4 border border-sr-indigo-100 rounded-full shadow-sm",children:[t.jsx("div",{className:"border-2 border-sr-indigo-300 border-t-transparent rounded-full w-5 h-5 animate-spin"}),t.jsx("span",{className:"font-matter font-medium text-sr-indigo-700 text-sm",children:"Connecting..."})]})]})]}),t.jsx("div",{className:"flex justify-center items-center gap-4 px-4 h-[60px] shrink-0",children:t.jsx(fe,{product:"stt",show:!0,layout:"inline",message:"Want to use this API?",ctaText:"Get 100 credits free",dashboardHref:w?.dashboardHref,exploreHref:w?.href,exploreText:w?.text})})]})}export{ze as default};
