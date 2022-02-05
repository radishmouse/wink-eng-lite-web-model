const originalModel=require("./languages/cur/models/eng-core-web-model.json");var readModel=function(){const model=JSON.parse(JSON.stringify(originalModel));var lexiconAsBuffer,xpansionsAsBuffer,packing=model.packing,featuresData=model.features,pos=model.pos;lexiconAsBuffer=Buffer.from(model.lexicon,"base64"),model.lexicon=new Uint32Array(lexiconAsBuffer.buffer,0,lexiconAsBuffer.length/4),xpansionsAsBuffer=Buffer.from(model.xpansions,"base64"),model.xpansions=new Uint32Array(xpansionsAsBuffer.buffer,0,xpansionsAsBuffer.length/4);for(const f in model.packing.layout)if(0===packing.layout[f][3]){featuresData[f].hash=Object.create(null);for(let k=0;k<featuresData[f].list.length;k+=1)featuresData[f].hash[featuresData[f].list[k]]=k}featuresData.lexeme.hash=Object.create(null);for(let k=0;k<featuresData.lexeme.list.length;k+=1)featuresData.lexeme.hash[featuresData.lexeme.list[k]]=k;const clusters=featuresData.posClusters.list;for(let k=0;k<clusters.length;k+=1)clusters[k]=new Set(clusters[k].split("_").map((e=>pos.hash[e]||0)));return model};module.exports=readModel;