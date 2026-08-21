import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(fs.readFileSync("skills.sh.json", "utf8"));
const names = manifest.groupings.flatMap((group) => group.skills);

let failed = false;

for (const name of names) {
  const skillMd = path.join("skills", name, "SKILL.md");
  let skillFailed = false;

  if (!fs.existsSync(skillMd)) {
    console.error(`Missing ${skillMd}`);
    skillFailed = true;
  } else {
    const content = fs.readFileSync(skillMd, "utf8");

    if (!content.startsWith("---")) {
      console.error(`${skillMd}: missing YAML frontmatter`);
      skillFailed = true;
    } else {
      const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);

      if (!frontmatter) {
        console.error(`${skillMd}: invalid frontmatter`);
        skillFailed = true;
      } else {
        if (!/^name:\s*.+/m.test(frontmatter[1])) {
          console.error(`${skillMd}: missing name`);
          skillFailed = true;
        }

        if (!/^description:\s*.+/m.test(frontmatter[1])) {
          console.error(`${skillMd}: missing description`);
          skillFailed = true;
        }
      }
    }
  }

  if (skillFailed) {
    failed = true;
  } else {
    console.log(`OK ${name}`);
  }
}

if (failed) {
  process.exit(1);
}
