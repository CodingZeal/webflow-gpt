# WebflowGPT
Lets have AI write some meta descriptions for our blog. Shall we?

## Simple Setup
1. After downloading this repo, install all NPM packages:
```bash
npm i
```
2. Add your environment variables! 🧪
```bash
cp .env.example .env
```
Fill in the values for the keys the example file generated for you. You'll need the following values:
  - `OPENAI_API_KEY`
  - `WEBFLOW_API_KEY`
  - `WEBFLOW_SITE_ID`
  - `WEBFLOW_BLOG_ID`

3. Run the program in the project's root and experience the magic in your console. 🪄
```bash
npm run magic
```

## Wait, Did You Say Magic?
Head over to `package.json` and check out the `scripts` section. Yes, lots of magic. Basically, we create a temporary database, add Webflow posts to it, ask OpenAI to generate new meta descriptions, and then create a `posts.csv` file to document all our work. Fun, fun! 🥳🎉

## Troubleshooting
Have you tried turning it off and then back on again? Just kidding ... but seriously. Drop your database(s) and remove any existing reports! And yes, there's a command for that:
```bash
npm run reboot
```