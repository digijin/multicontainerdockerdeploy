var fs = require("fs");
var archiver = require("archiver");

var argv = require("yargs").argv;
var project = argv.project;
var version = argv.version;

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
archive.directory("devops/package/", false);

//process dockerrun file
var dockerrun = require("./Dockerrun.aws.json");

//add specific server image
if (argv.image) {
  dockerrun.containerDefinitions[0].image = argv.image;
}

archive.append(JSON.stringify(dockerrun, null, 2), {
  name: "Dockerrun.aws.json"
});

archive.finalize();
