---
title: sample code for syntax highlighting themes
date: 2024-06-08T17:48:33+03:00
uuid: 20240608174833
slug: sample-code-for-syntax-highlighting-themes
draft: true
description: 
tags: 
---

https://github.com/sharkdp/bat/tree/master/tests/syntax-tests/highlighted

```css
/*Scrolling*/
html { scroll-behavior: smooth; }

/*Header text*/
.jumbotron {
    background-image: linear-gradient(90deg, #849EB5, #30394A);
    padding-bottom: 20px;
    padding-top: 20px;
    text-shadow: 0px 2px 4px #000000;
}

.container {
    margin-top: -25px;
}

/*Background related*/
body {
    background: #161616;
}

/*Text related CSS*/
h4 {
    font-size: 70px;
    color: #FFFFFF;
    font-family: News Cycle, serif;
}

h3 {
    color: #e5e5e5;
}

p {
    font-size: 17px;
    font-family: News Cycle, serif;
    color: #DEDEDE;
}

p2 {
    font-size: 24px;
    color: #DEDEDE;
    font-family: News Cycle, serif;
}

date {
    font-family: News Cycle, serif;
    font-style: italic;
    font-size: 17px;
    color: #DEDEDE;
}

jobtitle {
    font-size: 17px;
    font-weight: bold;
    font-family: News Cycle, serif;
    color: #DEDEDE;
}

jobtilenolink {
    font-size: 17px;
    font-weight: bold;
    font-family: News Cycle, serif;
    color: #DEDEDE;
}

li {
    font-family: News Cycle, serif;
    color: #DEDEDE;
}



a {
    color: #4A8ECC;
}

p a:visited {
    color: #4A8ECC;
}

.href {
    color: #4A8ECC;
}

a:visited {
    color: #4A8ECC;
}

p a:hover {
    color: #4FB1F4;
}

a:hover {
    color: #4FB1F4;
}

jobtitle:hover {
    color: #4FB1F4;
}

/*Section*/
section {
    background-color: #1B1B1B;
    padding: 20px;
    margin: -5px;
    margin-bottom: 30px;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
}


/*Icon related*/
.icon {
    position: relative;
    top: 3px;
    right: 5px;
}
```

```env
# Keyword
export TEST_KEYWORD="bar"
export TEST_KEYWORD=12345
export TEST_KEYWORD=TRUE

# Variable
TEST_VARIABLE="Hello"

# String interpolation
TEST_INTERPOLATION_VARIABLE="$VAR1 test test$VAR2test test"
TEST_INTERPOLATION_SYNTAX_ONE="test test{$NVAR1}test{$NVAR2}test test"
TEST_INTERPOLATION_SYNTAX_TWO="test test${NVAR1}test${NVAR2}test test"
TEST_INTERPOLATION_SYNTAX_ALL="test$VAR1test test {VAR2}test test${VAR3}test"

# Unquoted
TEST_UNQUOTED=bar
TEST_UNQUOTED_NO_VALUE=

# White spaced
TEST_WHITE_SPACE =
TEST_WHITE_SPACE_STRING = "Hello"
TEST_WHITE_SPACE_UNQUOTED = bar
TEST_WHITE_SPACE_UNQUOTED_BOOL = false
TEST_WHITE_SPACE_UNQUOTED_NUM = 20

# language constants
TEST_TRUE=true
TEST_FALSE=false
TEST_NULL=null
TEST_TRUE_CAPITAL=TRUE
TEST_FALSE_CAPITAL=FALSE
TEST_NULL_CAPITAL=NULL

# Numerical values
TEST_NUM_DECIMAL=54
TEST_NUM_FLOAT=5.3
TEST_NUM=1e10
TEST_NUM_NEGATIVE=-42
TEST_NUM_OCTAL=057
TEST_NUM_HEX=0x1A

# Comments
#TEST_ONE=foobar
# TEST_TWO='foobar'
# TEST_THREE="foobar" # a comment on a commented row
TEST_FOUR="test test test" # this is a comment
TEST_FIVE="comment symbol # inside string" # this is a comment
TEST_SIX="comment symbol # and quotes \" \' inside quotes" # " this is a comment

# Escape sequences
TEST_ESCAPE="escaped characters \n \t \r \" \' \$ or maybe a backslash \\..."

# Double Quotes
TEST_DOUBLE="Lorem {$VAR1} ${VAR2} $VAR3 ipsum dolor sit amet\n\r\t\\"

# Single Quotes
TEST_SINGLE='Lorem {$VAR1} ${VAR2} $VAR3 ipsum dolor sit amet\n\r\t\\'
```

```dart
/* array sorting alogorithm */
int partition(List list, int low, int high) {
  if (list == null || list.length == 0) return 0;
  int pivot = list[high];
  int i = low - 1;

  void swap(List list, int i, int j) {
    int temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  for (int j = low; j < high; j++) {
    if (list[j] <= pivot) {
      i++;
      swap(list, i, j);
    }
    swap(list, i + 1, high);
    return i + 1;
  }
}

void quickSort(List list, int low, int high) {
  if (low < high) {
    int pi = partition(list, low, high);
    quickSort(list, low, pi - 1);
    quickSort(list, pi + 1, high);
  }
}

void merge(List list, int leftIndex, int middleIndex, int rightIndex) {
  int leftSize = middleIndex - leftIndex + 1;
  int rightSize = rightIndex - middleIndex;

  List leftList = new List(leftSize);
  List rightList = new List(rightSize);

  for (int i = 0; i < leftSize; i++) leftList[i] = list[leftIndex + i];
  for (int j = 0; j < rightSize; j++) rightList[j] = list[middleIndex + j + 1];

  int i = 0, j = 0;
  int k = leftIndex;

  while (i < leftSize && j < rightSize) {
    if (leftList[i] <= rightList[j]) {
      list[k] = leftList[i];
      i++;
    } else {
      list[k] = rightList[j];
      j++;
    }
    k++;
  }

  while (i < leftSize) {
    list[k] = leftList[i];
    i++;
    k++;
  }

  while (j < rightSize) {
    list[k] = rightList[j];
    j++;
    k++;
  }
}

void mergeSort(List list, int leftIndex, int rightIndex) {
  if (leftIndex < rightIndex) {
    int middleIndex = (rightIndex + leftIndex) ~/ 2;

    mergeSort(list, leftIndex, middleIndex);
    mergeSort(list, middleIndex + 1, rightIndex);

    merge(list, leftIndex, middleIndex, rightIndex);
  }
}

/* variables */
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg'
};

/*classes */
class Spacecraft {
  String name;
  DateTime launchDate;
  Spacecraft(this.name, this.launchDate) {}

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  int get launchYear => launchDate?.year;

  void describe() {
    print('Spacecraft: $name');
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}

/* Mixins */
class PilotedCraft extends Spacecraft with Piloted {
  // ···
}

/* Interfaces and abstract classes */
class MockSpaceship implements Spacecraft {
  // ···
}

/* async */
Future<void> printWithDelay(String message) {
  return Future.delayed(const Duration(seconds: 2)).then((_) {
    print(message);
  });
}

Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (var object in objects) {
    await Future.delayed(const Duration(seconds: 2));
    yield '${craft.name} flies by $object';
  }
}
```

```c
#define UNICODE
#include <windows.h>
 
int main(int argc, char **argv) {
  int speed = 0, speed1 = 0, speed2 = 0; // 1-20
  printf("Set Mouse Speed by Maverick\n");
 
  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("Current speed: %2d\n", speed);
 
  if (argc == 1) return 0;
  if (argc >= 2) sscanf(argv[1], "%d", &speed1);
  if (argc >= 3) sscanf(argv[2], "%d", &speed2);
 
  if (argc == 2) // set speed to first value
    speed = speed1;
  else if (speed == speed1 || speed == speed2) // alternate
    speed = speed1 + speed2 - speed;
  else
    speed = speed1;  // start with first value
 
  SystemParametersInfo(SPI_SETMOUSESPEED, 0,  speed, 0);
  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("New speed:     %2d\n", speed);
  return 0;
}
```

```java
import java.util.Map;
import java.util.TreeSet;
 
public class GetEnv {
  /**
   * let's test generics
   * @param args the command line arguments
   */
  public static void main(String[] args) {
    // get a map of environment variables
    Map<String, String> env = System.getenv();
    // build a sorted set out of the keys and iterate
    for(String k: new TreeSet<String>(env.keySet())) {
      System.out.printf("%s = %s\n", k, env.get(k));
    }
  }    }
```

```pl

#!perl -w
 
# Time-stamp: <2002/04/06, 13:12:13 (EST), maverick, csvformat.pl>
# Two pass CSV file to table formatter
 
$delim = $#ARGV >= 1 ? $ARGV[1] : ',';
print STDERR "Split pattern: $delim\n";
 
# first pass
open F, "<$ARGV[0]" or die;
while(<F>)
{
  chomp;
  $i = 0;
  map { $max[$_->[1]] = $_->[0] if $_->[0] > ($max[$_->[1]] || 0) }
    (map {[length $_, $i++]} split($delim));
}
close F;
 
print STDERR 'Field width:   ', join(', ', @max), "\n";
print STDERR join(' ', map {'-' x $_} @max);
 
# second pass
open F, "<$ARGV[0]" or die;
while(<F>)
  {
  chomp;
  $i = 0;
  map { printf("%-$max[$_->[1]]s ", $_->[0]) }
    (map {[$_, $i++]} split($delim));
  print "\n";
}
close F;
```

```py

# test python (sample from offlineimap)
 
class ExitNotifyThread(Thread):
    """This class is designed to alert a "monitor" to the fact that a thread has
    exited and to provide for the ability for it to find out why."""
    def run(self):
        global exitthreads, profiledir
        self.threadid = thread.get_ident()
        try:
            if not profiledir:          # normal case
                Thread.run(self)
            else:
                try:
                    import cProfile as profile
                except ImportError:
                    import profile
                prof = profile.Profile()
                try:
                    prof = prof.runctx("Thread.run(self)", globals(), locals())
                except SystemExit:
                    pass
                prof.dump_stats( \
                            profiledir + "/" + str(self.threadid) + "_" + \
                            self.getName() + ".prof")
        except:
            self.setExitCause('EXCEPTION')
            if sys:
                self.setExitException(sys.exc_info()[1])
                tb = traceback.format_exc()
                self.setExitStackTrace(tb)
        else:
            self.setExitCause('NORMAL')
        if not hasattr(self, 'exitmessage'):
            self.setExitMessage(None)
 
        if exitthreads:
            exitthreads.put(self, True)
 
    def setExitCause(self, cause):
        self.exitcause = cause
    def getExitCause(self):
        """Returns the cause of the exit, one of:
        'EXCEPTION' -- the thread aborted because of an exception
        'NORMAL' -- normal termination."""
        return self.exitcause
    def setExitException(self, exc):
        self.exitexception = exc
    def getExitException(self):
        """If getExitCause() is 'EXCEPTION', holds the value from
        sys.exc_info()[1] for this exception."""
        return self.exitexception
    def setExitStackTrace(self, st):
        self.exitstacktrace = st
    def getExitStackTrace(self):
        """If getExitCause() is 'EXCEPTION', returns a string representing
        the stack trace for this exception."""
        return self.exitstacktrace
    def setExitMessage(self, msg):
        """Sets the exit message to be fetched by a subsequent call to
        getExitMessage.  This message may be any object or type except
        None."""
        self.exitmessage = msg
    def getExitMessage(self):
        """For any exit cause, returns the message previously set by
        a call to setExitMessage(), or None if there was no such message
        set."""
        return self.exitmessage
```

```sh
#!/bin/bash
 
cd $ROOT_DIR
DOT_FILES="lastpass weechat ssh Xauthority"
for dotfile in $DOT_FILES; do conform_link "$DATA_DIR/$dotfile" ".$dotfile"; done
 
# TODO: refactor with suffix variables (or common cron values)
 
case "$PLATFORM" in
    linux)
        #conform_link "$CONF_DIR/shell/zshenv" ".zshenv"
        crontab -l > $ROOT_DIR/tmp/crontab-conflict-arch
        cd $ROOT_DIR/$CONF_DIR/cron
        if [[ "$(diff ~/tmp/crontab-conflict-arch crontab-current-arch)" == ""
            ]];
            then # no difference with current backup
                logger "$LOG_PREFIX: crontab live settings match stored "\
                    "settings; no restore required"
                rm ~/tmp/crontab-conflict-arch
            else # current crontab settings in file do not match live settings
                crontab $ROOT_DIR/$CONF_DIR/cron/crontab-current-arch
                logger "$LOG_PREFIX: crontab stored settings conflict with "\
                    "live settings; stored settings restored. "\
                    "Previous settings recorded in ~/tmp/crontab-conflict-arch."
        fi
    ;;
```



```hs
{-# LANGUAGE OverloadedStrings #-}
module Main where
 
--import Prelude hiding (id)
--import Control.Category (id)
import Control.Arrow ((>>>), (***), arr)
import Control.Monad (forM_)
-- import Data.Monoid (mempty, mconcat)
 
-- import System.FilePath
 
import Hakyll
 
 
main :: IO ()
main = hakyll $ do
 
    route   "css/*" $ setExtension "css"
    compile "css/*" $ byExtension (error "Not a (S)CSS file")
        [ (".css",  compressCssCompiler)
        , (".scss", sass)
        ]
 
    route   "js/**" idRoute
    compile "js/**" copyFileCompiler
 
    route   "img/*" idRoute
    compile "img/*" copyFileCompiler
 
    compile "templates/*" templateCompiler
 
    forM_ ["test.md", "index.md"] $ \page -> do
        route   page $ setExtension "html"
        compile page $ pageCompiler
            >>> applyTemplateCompiler "templates/default.html"
            >>> relativizeUrlsCompiler
 
sass :: Compiler Resource String
sass = getResourceString >>> unixFilter "sass" ["-s", "--scss"]
                         >>> arr compressCss
```

```obj-c
#import "Cocoa1AppDelegate.h"
 
@implementation Cocoa1AppDelegate
 
@synthesize window,siteUrl,pageContents;
 
- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    // Insert code here to initialize your application
    model = [[Cocoa1Model alloc] init];
}
 
- (IBAction)getSiteContents:(id)sender {
    [model setPageUrl:[siteUrl stringValue]];
    NSString* reply = [model getUrlAsString];
    NSLog(@"pageSrc: %@", reply);
    [pageContents setString:reply];
    [[[pageContents textStorage] mutableString] appendString:reply];
}
 
@end
```

```php

<?php
require_once($GLOBALS['g_campsiteDir']. "/$ADMIN_DIR/country/common.php");
require_once($GLOBALS['g_campsiteDir']. "/classes/SimplePager.php");
camp_load_translation_strings("api");
 
$f_country_language_selected = camp_session_get('f_language_selected', '');
$f_country_offset = camp_session_get('f_country_offset', 0);
if (empty($f_country_language_selected)) {
    $f_country_language_selected = null;
}
$ItemsPerPage = 20;
$languages = Language::GetLanguages(null, null, null, array(), array(), true);
$numCountries = Country::GetNumCountries($f_country_language_selected);
 
$pager = new SimplePager($numCountries, $ItemsPerPage, "index.php?");
 
$crumbs = array();
$crumbs[] = array(getGS("Configure"), "");
$crumbs[] = array(getGS("Countries"), "");
echo camp_html_breadcrumbs($crumbs);
 
?>
 
<?php  if ($g_user->hasPermission("ManageCountries")) { ?>
<table BORDER="0" CELLSPACING="0" CELLPADDING="1">
    <tr>
        <td><a href="add.php"><?php putGS("Add new"); ?></a></td>
    </tr>
</table>
```

```rb
desc "Edit a post (defaults to most recent)"
task :edit_post, :title do |t, args|
  args.with_defaults(:title => false)
  posts = Dir.glob("#{source_dir}/#{posts_dir}/*.*")
  post = (args.title) ? post = posts.keep_if {|post| post =~ /#{args.title}/}.last : posts.last
  if post
    puts "Opening #{post} with #{editor}..."
    system "#{ENV['EDITOR']} #{post} &"
  else
    puts "No posts were found with \"#{args.title}\" in the title."
  end
end
```

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html><head>
<title>A Tiny Page</title>
<style type="text/css">
<!--
      p { font-size:15pt; color:#000 }
    -->
</style></head><!-- real comment -->
<body bgcolor="#FFFFFF" text="#000000" link="#0000CC">
<script language="javascript" type="text/javascript">
      function changeHeight(h) {
        var tds = document.getElementsByTagName("td");
        for(var i = 0; i < tds.length; i++) {
          tds[i].setAttribute("height", h + "px");
      }}
</script>
<h1>abc</h1>
<h2>def</h2>
<p>Testing page</p>
</body></html>
```

```js
var undefined,
    xui,
    window     = this,
    string     = new String('string'),
    document   = window.document,
    simpleExpr = /^#?([\w-]+)$/,
```


```py
#!/usr/bin/env python
"""Test file for Python syntax highlighting in editors / IDEs.

Meant to cover a wide range of different types of statements and expressions.
Not necessarily sensical or comprehensive (assume that if one exception is
highlighted that all are, for instance).

Extraneous trailing whitespace can't be tested because of svn pre-commit hook
checks for such things.

"""
# Comment
# OPTIONAL: XXX catch your attention
# TODO(me): next big thing
# FIXME: this does not work

# Statements
from __future__ import with_statement  # Import
from sys import path as thing

print(thing)

assert True  # keyword


def foo():  # function definition
    return []


class Bar(object):  # Class definition
    def __enter__(self):
        pass

    def __exit__(self, *args):
        pass

foo()  # UNCOLOURED: function call
while False:  # 'while'
    continue
for x in foo():  # 'for'
    break
with Bar() as stuff:
    pass
if False:
    pass  # 'if'
elif False:
    pass
else:
    pass

# Constants
'single-quote', u'unicode'  # Strings of all kinds; prefixes not highlighted
"double-quote"
"""triple double-quote"""
'''triple single-quote'''
r'raw'
ur'unicode raw'
'escape\n'
'\04'  # octal
'\xFF'  # hex
'\u1111'  # unicode character
1  # Integral
1L
1.0  # Float
.1
1+2j  # Complex

# Expressions
1 and 2 or 3  # Boolean operators
2 < 3  # UNCOLOURED: comparison operators
spam = 42  # UNCOLOURED: assignment
2 + 3  # UNCOLOURED: number operators
[]  # UNCOLOURED: list
{}  # UNCOLOURED: dict
(1,)  # UNCOLOURED: tuple
all  # Built-in functions
GeneratorExit  # Exceptions
```