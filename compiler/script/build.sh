#!/bin/bash

java -jar ./../bin/compiler.jar \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level VERBOSE \
--compilation_level SIMPLE_OPTIMIZATIONS \
--isolation_mode IIFE \
--js "./../../src/index.html" \
--js "./../../src/css/style.css" \
--js "./../../src/img/error.png" \
--js "./../../src/img/warning.png" \
--js "./../../src/js/Main.js" \
--js_output_file "./../../dist/helper.js";