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


export interface WelshPowellResult{
  graphId:Guid,
  colorsUsed:number,
  nodeWithColors: Record<number, number>;
  executionTime:number
}

export interface WelshPowellResponse{
  result:WelshPowellResult
}

export interface NodeWithDegree{
  id: number,
  tag:string,
  degree: number,
  normalizeDegree: number
}

export interface DegreeCentralityResult{
  id: Guid,
  maxDegree:number,
  nodeDegrees:Record<string, number>,
  executionTime:number
}

export interface DegreeCentralityResponse{
  result : DegreeCentralityResult
}

export interface TopFiveNodeInDegreeResult{
  id:Guid,
  maxDegree:number,
  nodes:NodeWithDegree[],
  executionTime:number
}
export interface TopFiveNodeInDegreeResponse{
  result: TopFiveNodeInDegreeResult
}


export interface ComponentDto{
  id:number,
  nodes:Node[]
}
export interface ConnectedComponentResult{
  graphId: Guid,
  components:ComponentDto[]
  executionTime:number
}
export interface ConnectedComponentResponse{
  result : ConnectedComponentResult
}


export interface AStarPathFindingResponse{
  result:TraversalResult
}

export interface DijsktraPathFindingResponse{
  result:TraversalResult
}


export interface CommunityDetectionResult{
  graphId: Guid,
  nodeToCommunity:Record<number, number>,
  communityCount:number,
  executionTime:number
}

