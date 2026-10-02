function d(e){if(typeof window>"u")throw new Error("Web Audio is only available in the browser.");const t=window.AudioContext??window.webkitAudioContext;if(!t)throw new Error("This browser does not support Web Audio.");return new t(e)}const i="sarvam-pcm-capture",p=`
class SarvamPcmCaptureProcessor extends AudioWorkletProcessor {
    process(inputs, outputs) {
        const input = inputs[0] && inputs[0][0];
        if (input && input.length > 0) {
            const copy = input.slice();
            this.port.postMessage(copy.buffer, [copy.buffer]);
        }

        const output = outputs[0] && outputs[0][0];
        if (output) output.fill(0);
        return true;
    }
}
registerProcessor("${i}", SarvamPcmCaptureProcessor);
`;async function l(e,t,c){if(!e.audioWorklet||typeof AudioWorkletNode>"u")throw new Error("This browser does not support AudioWorklet microphone processing.");const r=URL.createObjectURL(new Blob([p],{type:"text/javascript"}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}const s=e.createMediaStreamSource(t),o=new AudioWorkletNode(e,i,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:1,channelCountMode:"explicit"}),n=e.createGain();n.gain.value=0,o.port.onmessage=a=>{c(new Float32Array(a.data))},s.connect(o),o.connect(n),n.connect(e.destination);let u=!1;return{node:o,dispose:()=>{u||(u=!0,o.port.onmessage=null,s.disconnect(),o.disconnect(),n.disconnect())}}}export{l as a,d as c};
