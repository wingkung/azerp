/**
 * Created by wing on 2014/6/6.
 */
function treeData(data) {
    var paths = [];
    for (var i in data) {
        var depth = data[i].depth;
        var path = [];
        paths.splice(depth + 1, paths.length - depth + 1)
        if (paths[depth] != undefined) {
            paths[depth] += 1;
        } else {
            paths[depth] = 0;
        }
        for (var j = 0; j < depth + 1; j++) {
            path.push(paths[j]);
        }
        data[i].path = path;
    }
    var tree = {children: []};

    for (var i in data) {
        var depth = data[i].depth;
        var path = data[i].path;
        var name = data[i].name;
        var child = tree;
        for (var j = 0; j < depth + 1; j++) {
            if (child.children[path[j]] == undefined) {
                child.children[path[j]] = {name: name, children: []};
            }
            child = child.children[path[j]];
        }
    }
    return tree;
}