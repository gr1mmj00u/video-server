install:
	npm install
publish:
	npm publish
lint:
	npm run eslint .
build:
	npm run build

prepare:
	touch .bash_history
	touch .env

start:
	DEBUG="application:*" npm run nodemon -- --watch .  --ext '.js' --exec npm run gulp -- server

debug:
	DEBUG="application:*" npm run gulp -- debug

console:
	npm run gulp console

.PHONY: test
