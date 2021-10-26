import {evaluate} from './interprete'
import { equal } from "assert";

it("assign and print",()=>{
    equal(evaluate([
        {assign:"a",value:1},
        {assign:"b",value:2},
        {assign:"c",value:3},
        {print:{var:"a"}},
        {print:" "},
        {print:{var:"b"}},
        {print:" "},
        {print:{var:"c"}},
        {print:" "},
        {print:{var:"a"}},
        {print:" "},
        {print:{var:"c"}},
    ],[]),"1 2 3 1 3");
})

it("assign, read and print",()=>{
    equal(evaluate([
        {assign:"a",value:{read:null}},
        {assign:"b",value:{read:null}},
        {assign:"c",value:3},
        {print:{var:"a"}},
        {print:" "},
        {print:{var:"b"}},
        {print:" "},
        {print:{var:"c"}},
        {print:" "},
        {print:{var:"a"}},
        {print:" "},
        {assign:"c",value:{var:"b"}},
        {print:{var:"c"}},
    ],["hola","mil"]),"hola mil 3 hola mil");
})