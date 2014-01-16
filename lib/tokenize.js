var _ = require('underscore')

// Include underscore string inflections lib

_.mixin( require('underscore.inflections') );

var STOP_WORDS = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'except', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'];

var BREAKS     = /[\s\/\-\xa0]/g;
var STOPS      = /,\s+/g;
var START_JUNK = /^[\s\;\:\,\.\!\?\(\)\"\'…“”‘’]+/;
var END_JUNK   = /[\s\;\:\,\.\!\?\(\)\"\'…“”‘’]+$/;

var normalizeWord = function (word) {
  word = word.toLowerCase();
  word = word.replace('&nbsp;', ' ');
  word = word.replace('’', '\'');
  word = word.replace(START_JUNK, '');
  word = word.replace(END_JUNK, '');
  return word;
}

var isStopWord = function (words) {
  words = _.isArray(words) ? words : [words];
  return _.some(words, function (word) {
    return STOP_WORDS.indexOf(word) != -1;
  });
}

var joinIfDefined = function (words) {
  if ( _.every( words, function (word) { return word !== undefined } ) ) return words.join(' ');
}

module.exports = function (text) {

  text = text + '';

  // Remove except clauses

  text = text.replace(/\(except.+\)/g, '');

  // Begin tokenization

  var words = _.map( text.split(BREAKS), normalizeWord );

  // Group words into singles and pairs

  var single_words = _.reject( words, isStopWord );
  var paired_words = _.chain(words).zip( words.slice( 1, words.length ) ).reject( isStopWord ).map( joinIfDefined ).reject( _.isUndefined ).value();

  // Singularize word pairs

  var singles_and_pairs = _.union( single_words, paired_words );
  var singularized_singles_and_pairs = _.map(singles_and_pairs, _.singularize);

  // Pair original and singularized lists

  return _.reject(_.union(singles_and_pairs, singularized_singles_and_pairs), _.isUndefined);
}
