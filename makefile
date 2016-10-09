# @Author: SuperWoods
# @Date:   2016-05-31-08:41:37
# @Email:  st_sister@iCloud.com
# @Last modified by:   SuperWoods
# @Last modified time: 2016-10-09-09:13:22
# @License: MIT
#
# .PHONY: clean
# clean:
# 	rm -r bundle

# -------------------------------------------------------------------------- css

# .PHONY: css
# css:
# 	mkdir -p bundle
# 	postcss --watch --use autoprefixer --use postcss-import css/homepage.css --output bundle/homepage.min.css &
# 	postcss --watch --use autoprefixer --use postcss-import css/content.css --output bundle/content.min.css

# --------------------------------------------------------------------------- js

.PHONY: js
js:
	mkdir -p wechat-webapp-cnode/pages/topics
	babel --watch wechat-webapp-cnode-es6/pages/topics.js --out-file wechat-webapp-cnode/pages/topics/topics.js
	# &
	# babel --watch js/nav.js --out-file bundle/nav.min.js &
	# babel --watch js/footer.js --out-file bundle/footer.min.js &
	# babel --watch js/content.js --out-file bundle/content.min.js &
	# babel --watch js/mask.js --out-file bundle/mask.min.js &
	# babel --watch js/mod-ani.js --out-file bundle/mod-ani.min.js

# ----------------------------------------------------------------------- server

# .PHONY: server
# server:
# 	gulp autowatch-jade &
# 	browser-sync start --server --files='*.html, bundle, css, js, img'

# -------------------------------------------------------------------------- all

# .PHONY: all
# all:
# 	make css & make js & make server & wait
