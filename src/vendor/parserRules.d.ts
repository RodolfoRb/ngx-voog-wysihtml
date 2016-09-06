/**
 * Full HTML5 compatibility rule set
 * Loosened and extended ruleset. Allows more freedom on user side
 * These rules define which tags and CSS classes are supported and which tags should be specially treated.
 */

declare namespace ParserRules {
  export var wysihtmlParserRules;
  export var wysihtmlParserRulesDefaults;
}

declare module "parser_rules" {
	export = ParserRules;
}
