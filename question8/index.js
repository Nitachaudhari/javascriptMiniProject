const files = [
    { name: "document1.pdf", size: 500 },
    { name: "document2.pdf", size: 700 },
    { name: "image1.png", size: 200 },
    { name: "image2.png", size: 300 },
    { name: "text1.txt", size: 100 },
    { name: "text2.txt", size: 150 },
    { name: "photo1.jpg", size: 400 },
    { name: "photo2.jpg", size: 350 },
    { name: "program1.exe", size: 1000 },
    { name: "program2.exe", size: 1200 },
    { name: "data1.csv", size: 600 },
    { name: "data2.csv", size: 500 },
    { name: "report1.pdf", size: 800 },
    { name: "report2.pdf", size: 900 },
    { name: "image3.png", size: 250 },
    { name: "text3.txt", size: 175 },
    { name: "photo3.jpg", size: 450 },
    { name: "document3.pdf", size: 750 }
  ];
  
  
function processFiles(files){
    const totalSize=files.reduce((sum,file)=>sum+file.size,0);

    const largestFiles=files
        .slice()
        .sort((a,b)=>b.size-a.size)
        .splice(0,5)
        .map(file=>({name:file.name,size:file.size}));

    const fileByExtension=files.reduce((acc,file)=>{
        const extension = file.name.split('.').pop();

        if (!acc[extension]){
            acc[extension]=[];
        }

        acc[extension].push(file.name);
        return acc;
    },{});

    return{
        totalSize,
        largestFiles,
        fileByExtension
    };
}

console.log(processFiles(files));