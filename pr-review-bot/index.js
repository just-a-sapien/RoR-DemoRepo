require("dotenv").config();
const { Probot } = require("probot");
const OpenAI = require("openai");

module.exports = app => {
  // Listen to PR opened & updated events
  app.on(["pull_request.opened", "pull_request.synchronize"], async context => {
    const { owner, repo } = context.repo();
    const prNumber = context.payload.pull_request.number;

    // 1. Fetch the list of changed files & their diffs
    const filesResp = await context.octokit.pulls.listFiles({
      owner, repo, pull_number: prNumber
    });
    const diffText = filesResp.data.map(f => f.patch || "").join("\n\n");

    // 2. Call OpenAI to review the diff
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const reviewResp = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert Ruby on Rails code reviewer." },
        { role: "user",   content: diffText }
      ]
    });
    const review = reviewResp.choices[0].message.content;

    // 3. Post the AI’s review back as a PR comment
    await context.octokit.issues.createComment({
      owner, repo,
      issue_number: prNumber,
      body: review
    });
  });
};

process.env.PORT = process.env.PORT || 3001;

// Start the Probot server
if (require.main === module) {
  Probot.run(module.exports);
}
