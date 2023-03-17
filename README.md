# WebflowGPT
Lets have AI write some meta descriptions for our blog. Shall we?

## Webflow Setup and Assumptions
This repo assumes the following:
- You have a collection in Webflow with blog posts. The name of that collection is up to you.
- Every Webflow collection can be interacted with [through their API](https://developers.webflow.com/reference/list-items). 
  - When requesting the items from your blog collection, we assume that you have the key `meta-description` in each item of your payload.
  - We also assume you have a `post-body` key in your payload with the contents of your blog. We feed your post data to OpenAI to generate meta descriptions.

If you don't have a collection in Webflow with `meta-description` and `post-body` fields, make sure you build that first and publish your site. To have your new meta descriptions show up in search engines, you'll also need to set up meta descriptions for your blog collection's template pages. You can then have Webflow dynamically insert the `meta-description` from your collection. See [Webflow's docs](https://university.webflow.com/lesson/seo-title-meta-description) for more details on setting up meta descriptions.

## Ready, Aim, Duck!
1. After downloading this repo (and setting up Webflow), install all NPM packages:
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
Give that script some time to run (we throttle the requests based on OpenAI's API rate limits). If there are errors, you should see them in your console. When the program finishes, all your posts are live in Webflow with new meta descriptions. You'll also get a nifty report in the `reports` directory.

## Wait, Did You Say Magic?
Head over to `package.json` and check out the `scripts` section. Yes, lots of magic. Basically, we create a temporary database, add Webflow collection data to it, ask OpenAI to generate new meta descriptions, and then create a `posts.csv` file to document all our work. Fun, fun! 🥳🎉

## Troubleshooting
Have you tried turning it off and then back on again? Just kidding ... but seriously. Drop your database and remove any existing reports! And yes, there's a command for that:
```bash
npm run reboot
```