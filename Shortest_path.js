function ShortestPath(strArr) { //["5","A","B","C","D","F","A-B","A-C","B-C","C-D","D-F"]
    
  var nodeCount=Number(strArr[0]);
  var nodeArr=strArr.slice(1,nodeCount+1);
  var nodeConnectionsArr=strArr.slice(nodeCount+1);
  var nodeConnections=nodeConnectionsArr.reduce(function(a,b){
      a.push(b.split('-'));
      return a;
  },[]);
  var graph= new Graph();
  for(var i=0;i<nodeConnections.length;i++){
      var connection = nodeConnections[i].slice();
      graph.addEdge(connection[0],connection[1]);
  }
  strArr = findShortestPath(graph,nodeArr[0],nodeArr[nodeCount-1]);
  return strArr; 
         
}

function Graph(){
    var neighbors= this.neighbors = {};
    
    this.addEdge=function(u,v){
        if(neighbors[u]===undefined){
            neighbors[u] = [];
        }
        neighbors[u].push(v);
        if(neighbors[v]===undefined){
            neighbors[v] = [];
        }
        neighbors[v].push(u);
    };
    return this;

}

function findShortestPath(graph,firstNode,lastNode){
    if(firstNode === lastNode){
        return firstNode;
    }
    var queue = [firstNode];
    var visited = [ ];
    var predecessor = {};
    var tail = 0;
    visited[firstNode] = true;
    while(tail <queue.length){
        var u = queue[tail++];
        var neighbors = graph.neighbors[u];
        for(var i=0;i<neighbors.length;i++){
            var v=neighbors[i];
            if(visited[v])
                continue;
            visited[v]=true;
            if(v===lastNode){
                var path=[v];
                while(u!==firstNode){
                    path.push(u);
                    u=predecessor[u];
                }
                path.push(u);
                path.reverse();
                path.join('-');
                return path;
            }
            predecessor[v]=u;
            queue.push(v);
        }
    }
    return -1;
}
   
// keep this function call here 
ShortestPath(readline());                            