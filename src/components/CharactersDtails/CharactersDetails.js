import React,{useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

function CharactersDetails() {
    const [character, setCharacter] = useState({});
    const {name} = useParams();
     const [error, setError] =useState(null);
    
    const url = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=${process.env.REACT_APP_MARVEL_APP_KEY}`;
  
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if(res.data.results){
                    setCharacter(res.data.results[0])
                    console.log(res)
                }
               
            })
            .catch((error) => {
                setError('wrong input')
                // setCharacter('not found')
                console.log(error)
        
              
               
            })
    
    }, [url])
    console.log(character)
    if(error !== null){
        return <h1>Caracter not found</h1>
    } else {

    
    return ( 
        
    
        <div className="char-dtl" key={character.id}>
             <div>
                 <h1 className="char-name"> ★ {character.name}  ★ </h1>
                 <p className='descrition'>{character.description}</p>
             </div>
            <img className="char-img" src={character.thumbnail && character.thumbnail.path + '.' + character.thumbnail.extension} alt={character.image} />
           
            <div className='li-container' key={character.id}>
           
                 {character.comics && character.comics.items.map((item) => (
                 <li clsassName='comics-li' >Comics: {item.name}</li>
                 ))}  

                 {character.series && character.series.items.map((item) => (
                  <li clsassName='series-li'>Series: {item.name}</li>
                  ))}
                
             </div>
            
       </div>
        
    );
                 }
                 
  }    
  
  export default CharactersDetails;