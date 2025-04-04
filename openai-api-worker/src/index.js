import OpenAI from "openai"

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
  };
export default {
	async fetch(request, env, ctx) {

		if (request.method === "OPTIONS"){
			return new Response(null, {headers:corsHeaders})
		}
		
		const openai = new OpenAI({
			apiKey:env.OPENAI_API_KEY,
			baseURL:"https://gateway.ai.cloudflare.com/v1/ab8c64c04d1f77f21d7ba13bc943bf38/stock_prediction/openai"
		})
		
		try{
			const messages = await request.json()

			const chatCompletion = await openai.chat.completions.create({
				model:"gpt-4o-mini",
				messages: messages,
				temperature:1.1,
				presence_penalty:0,
				frequency_penalty:0
			})
			const response = chatCompletion.choices[0].message
			return new Response(JSON.stringify(response), {headers:corsHeaders});

		} catch(e){
			return new Response(e,{headers:corsHeaders})
		}

	},
};
