let http = require("http");
let fs = require('fs');
let cors = require('cors');
let server = http.createServer((request, response) => {

  cors()(request, response, () => {
    response.writeHead(200, {
      "Content-Type": "application/json"
    });





    // GEt data
    if (request.method == 'GET' && request.url == '/Product') {
      fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
          response.end(err)
        } else {
          response.end(data)
        }
      })
    }


    // get desciption page
    else if (request.method == 'GET' && request.url.startsWith('/Discription/')) {
      let productId = request.url.split('/')[2];
      fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
          response.end(err);
        } else {

          const { Product } = JSON.parse(data);
          const filterdata = Product.filter((el) => el.id == productId);
          response.end(JSON.stringify(filterdata[0]));
        }
      });
    }


    // add product
    else if (request.method == "POST" && request.url == '/Addproduct') {
      let str = '';
      request.on('data', (chunk) => {
        str += chunk;
      })
      request.on('close', () => {
        let ProductData = JSON.parse(str);
        fs.readFile('./db.json', 'utf-8', (err, dbData) => {
          if (err) {
            response.end(err)
          } else {
            let Maindata = JSON.parse(dbData);
            Maindata.Product.push({ ...ProductData, id: new Date() });
            fs.writeFile('./db.json', JSON.stringify(Maindata), (err) => {
              if (err) {
                response.end(err)
              } else {
                response.end("data ADD");
              }
            });
          }
        });
      });
    }


    //delete
    else if (request.method == 'DELETE' && request.url.startsWith('/deleteproduct')) {
      let ProductId = request.url.split('/')[2];
      fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
          response.end(err);
        } else {
          let FinalData = JSON.parse(data);
          // console.log(FinalData);
          let fillterdata = FinalData.Product.filter((el) => el.id != ProductId)
          fs.writeFile('./db.json', JSON.stringify({ Product: fillterdata }), (err) => {
            if (err) {
              response.end(err)
            } else {
              response.end("Data Delete");
            }
          })
        }
      })

    }


    //update
    else if (request.method == 'PATCH' && request.url.startsWith('/UpdateProduct')) {
      let Upadateid = request.url.split("/")[2];
      let str = '';
      request.on('data', (pices) => {
        str += pices;
      })
      request.on('close', () => {
        let updateProductdata = JSON.parse(str);
        console.log(updateProductdata);
        fs.readFile('./db.json', 'utf-8', (error, data) => {
          if (error) {
            response.end(error)
          } else {
            let Maindata = JSON.parse(data);

            let FinalData = Maindata.Product.map((item) => item.id == Upadateid ? { ...item, ...updateProductdata } : item);
            Maindata.Product = FinalData;


            fs.writeFile('./db.json', JSON.stringify(Maindata), (err) => {
              if (err) {
                response.end(err)
              } else {
                response.end("Data Update");
              }
            })
          }
        })
      })
    } else {
      response.end("end point not Match")
    }
  })
})
server.listen(8080, () => {
  console.log("server Create");
})
