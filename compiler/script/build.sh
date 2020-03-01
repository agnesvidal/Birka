#!/bin/bash

java -jar ./../bin/compiler.jar \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level VERBOSE \
--compilation_level SIMPLE_OPTIMIZATIONS \
--isolation_mode IIFE \
--js "./../../src/js/scope/Manifest.js" \
--js "./../../src/js/ui/View.js" \
--js "./../../src/js/ui/Elem.js" \
--js "./../../src/js/project/Toolbar.js" \
--js "./../../src/js/dialog/Dialog.js" \
--js "./../../src/js/project/NewProjectDialog.js" \
--js "./../../src/js/project/Projectdirectory.js" \
--js "./../../src/js/project/ProjectManagerView.js" \
--js "./../../src/js/project/Project.js" \
--js "./../../src/js/project/ProjectManager.js" \
--js "./../../src/js/compiler/Resourcefile.js" \
--js "./../../src/js/compiler/ui/CompilerView.js" \
--js "./../../src/js/compiler/File.js" \
--js "./../../src/js/compiler/Message.js" \
--js "./../../src/js/compiler/MessageRow.js" \
--js "./../../src/js/compiler/TableRow.js" \
--js "./../../src/js/compiler/Compiler.js" \
--js "./../../src/js/system/Main.js" \
--js "./../../src/js/scope/Alias.js" \
--js_output_file "./../../dist/birka.js";


