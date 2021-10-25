#!/bin/bash

sass -I sass sass/:css/ --no-source-map --style=compressed && echo "SASS OK" || exit 1

cp _css/*.css css/

jekyll build --trace && echo "Jekyll OK"
