import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";



const ItemContext = createContext();

const Context =(props) =>{

    const [tempstate,setTempstate] = useState({
        items:[],
         cart:[],
         categories:[]
 });

     const[category,setCategory] = useState('All');
     const[sortFilter,setSortFilter] = useState();
     const[sort,setSort] = useState('relevance');
     const[search,setSearch] = useState("");

    const reducer =(state,action) =>{
        switch (action.type) {
            case 'init':
             
            setSortFilter({
                items:action.payload.itemdata,
                cart:[],
                categories:["All",...action.payload.categorydata]
            })
            return sortFilter;
    
            case 'category':
                setCategory(action.payload);
                if(action.payload==='relevance')state = {...sortFilter};
                return state;

            case 'add':
                setSortFilter({...state,cart:[...state.cart,{...action.payload,qty:1}]});
                state = sortFilter;
                return state;

            case 'remove':
                setSortFilter({...state,cart:state.cart.filter(element=>element.id!==action.payload.id)});
                state = sortFilter;
                return state;

            case 'change_qty':
                setSortFilter({...state,cart:state.cart.map(element=>
                    {
                        if(element.id!==action.payload.id)return element;
                        else return {...element,qty:action.payload.qty};
                    }
                   )});
                   state = sortFilter;
                   return state;
            case 'sort' :
                setSort(action.payload);
                  return state;
            case 'search':
                setSearch(action.payload);
                return state;

                case 'rating' :
                     state = {
                            ...sortFilter,items:sortFilter.items.filter(element=>element.rating.rate>=action.payload)
                        }
                        return state;
            default:
                return state;
        }
    }

    useEffect(()=>{

          const initFetch = async () => {
            const req1 = await axios.get(`https://fakestoreapi.com/products`)
            const req2 = await axios.get(`https://fakestoreapi.com/products/categories`)
            dispatch({type: 'init', payload: {itemdata: req1.data,categorydata:req2.data}})
        }
        
        initFetch()
    },[]);

    

    const [state, dispatch] = useReducer(reducer,{
           items:[],
            cart:[],
            categories:[]
    });

    useEffect(()=>{
        const itemlist =state.items
        .filter(element=>(category==='All'?true:element.category===category))
        .filter(element=>element.title.toLowerCase().includes(search))

        itemlist.sort((a,b)=>{
             if(sort==="popularity") return a.rating.count>=b.rating.count?-1:1;
            else if(sort==="low_to_high")return a.price<=b.price?-1:1;
            else if(sort==="high_to_low") return a.price<=b.price?1:-1;
            else return a.id<=b.id?-1:1;
        })
        setTempstate({
            ...state,
            items:itemlist
        })
    },[category,state,sort,search])



    return(
       <ItemContext.Provider value={{tempstate,dispatch}}>
           {props.children}
       </ItemContext.Provider>
    );
}

export {ItemContext,Context};