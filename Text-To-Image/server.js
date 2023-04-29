import * as dotenv from 'dotenv';
//  get the environment variables used in .env
dotenv.config();

// create a configuration object which requires APIKey(secret key)
import { Configuration, OpenAIApi } from 'openai';

// pass the secret key
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

// use configuration to initialize the openai API
const openai = new OpenAIApi(configuration);

// using express as frontend for node
import express from 'express';

// setting up middleware for express
// cross-origin-resource-sharing
import cors from 'cors';

// setup app
const app = express();
app.use(cors());
// handles data only json format
app.use(express.json());

// setting up end point
//  http-method + URI + (callback function) async function having request and response
// async function 
app.post('/dream', async (req, res) => {

    try
    {
        
        // users prompt
        const prompt = req.body.prompt;
    
        // call createImage method of openai and pass the user prompt
        // await waits until openai finishes its execution and responses back with the object
        const aiResponse = await openai.createImage({
          prompt, //user prompt
          n: 1, // no.of images required
          size: '1024x1024',    //resolution of images
        });
    
        // image url from response
        const image = aiResponse.data.data[0].url;
        // sending the url as the response in json format for the user
        res.send({ image });
    }
    catch(error){
        console.error(error)
        res.status(500).send(error?.response.data.error.message || 'Something went wrong')
    }
});
// fre-up server in port 8080
app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));