var fs = require("fs");
var archiver = require("archiver");

var project = process.argv[2] || "deploytest";
var version = process.argv[3] || "1";

//package
var output = fs.createWriteStream(
  __dirname + "/../" + project + "-v" + version + ".zip"
);
var archive = archiver("zip", {
  zlib: { level: 9 } // Sets the compression level.
});

output.on("close", function() {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed."
  );
});
archive.pipe(output);

//SPECIFICS
// archive.file("package.json", { name: "package.json" });
// archive.directory("src/", false);
archive.file("Dockerrun.aws.json", { name: "Dockerrun.aws.json" });
archive.directory(".ebextensions/", ".ebextensions");

archive.finalize();
