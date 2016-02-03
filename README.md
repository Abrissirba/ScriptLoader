# ScriptLoader

A library that lets you download javascript files when needed. Supports both synchronously and asynchronously downloading of multiple javascript files at the same time.

## Install

```
bower install abris-scriptloader --save
```

## Usage

```
    <script src="scriptLoader.js"></script>
    <script> 
        var loader = new ScriptLoader({async: true});
        loader.loadScripts(["src/test/one.js", "src/test/two.js","src/test/three.js"], 
            function(){
                console.log("All script loaded" );
            },
            function(src){
                console.log("Something went wrong" + src);
            }
        );
    </script>
```