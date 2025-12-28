import { Guid } from "./graph.model"
import {Node } from "./node.model"



export interface BFSRequest{
  command : any
}
export interface TraversalResult{
  id: Guid,
  nodes:Node[],
  executionTime: number
}
export interface BFSResponse{
  result:TraversalResult
}

export interface DFSResponse{
  result : TraversalResult
}

export interface NodeWithDegree{
  id: number,
  tag:string,
  degree: number
}
export interface DegreeCentralityResult{
  id: Guid,
  nodes:NodeWithDegree[],
  executionTime:number
}

export interface DegreeCentralityResponse{
  result : DegreeCentralityResult
}


