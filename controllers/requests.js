import fs from "fs";
import path from 'path';
const directory = './../Temp';
/*const do_object_array = (a, keyFiles, filesObject) => {
	let d;
	let z;
	for(let i = a.length - 1; i >= 1; i--) {
		z = {};
		if(a[i]) {
			z[a[i].toString()] = d;
			d = {};
			d[a[i].toString()] = z[a[i].toString()];
		}
	}
	else 
    return d;
}

const preg_match_all = (regex, str) => {
  return [...str.matchAll(new RegExp(regex, 'g'))].reduce((acc, group) => {
    group.filter((element) => typeof element === 'string').forEach((element, i) => {
      if (!acc[i]) acc[i] = [];
      acc[i].push(element);
    });

    return acc;
  }, []);
const regex = /\[(.*?)]/;
}*/


const writeWithDirSync = (filePath, content) => {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
}


const requests = async (req, res, next) => {
	let body = '';
	//req.setEncoding('utf8');
	req.on('data', (chunk) => {		
		body += chunk;
	});
	req.on('end', () => {
		try {
			let perenosStroki = `
`;
			let stringpoisk = ((body.split(perenosStroki)[0])) + perenosStroki;
			let forLoop = body.split(stringpoisk);
			let ReqObject = {}, nameLoop, keyFiles = '', filesObject, obj ={}, temp, d, fileOne;
			//console.log(forLoop);
			//let forMultiplKey;
			for(let i = 1; i < forLoop.length; i++) {
				if((forLoop[i].split(perenosStroki)[0]).split(' filename="')[1]) {
					if(!filesObject) filesObject = {};
					keyFiles = (((forLoop[i].split(perenosStroki)[0]).split(' name="')[1]).split('"; filename="')[0]);
					temp = forLoop[i].split(perenosStroki);
					obj.originalname = ((temp[0]).split(' filename="')[1]).slice(0, -2)
					obj.mimetype = ((temp[1]).split('Content-Type: ')[1]).slice(0, -1)
					d = new Date();					
					obj.filename = 'f' + d.getTime();
					obj.path = directory + '/' + obj.filename;
					fileOne = temp.splice(0, 3);
					writeWithDirSync(obj.path, temp.join(perenosStroki));
					//console.log(forLoop[i].split(perenosStroki)[3]);
					obj ={
							size: ' ',
							//path: ((forLoop[i].split(perenosStroki)[0]).split(' filename="')[1]).slice(0, -2)	
					};
					if(keyFiles.includes('[')) {
						//forMultiplKey = preg_match_all(regex, keyFiles);						
						//console.log(forMultiplKey);
						keyFiles = keyFiles.split('[')[0];
						//console.log('rabotaem ', do_object_array(forMultiplKey[1], keyFiles, filesObject));
						if(!filesObject[keyFiles]) {
							filesObject[keyFiles] = []
						}
						filesObject[keyFiles][filesObject[keyFiles].length] = obj
					}
					else {							
						filesObject[keyFiles] = obj;
					}
				}
				else {
					ReqObject[((forLoop[i].split(perenosStroki)[0]).split(' name="')[1]).slice(0, -2)] = forLoop[i].split(perenosStroki)[2].slice(0, -1)
				}
			}
		  req.body = ReqObject;
		  if(filesObject) req.files = filesObject;
		  next();
		} catch (er) {
		  res.statusCode = 400;
		  return res.end(`error: ${er.message}`);
		}
  });
}
export default requests;