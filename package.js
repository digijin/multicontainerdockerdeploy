var fs = require("fs");
var archiver = require("archiver");

//package
var output = fs.createWriteStream(__dirname + "/package.zip");
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
archive.file("package.json", { name: "package.json" });
archive.directory("src/", false);
archive.finalize();
