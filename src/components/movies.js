
import React, { Component } from 'react';

import {getMovies} from '../services/fakeMovieService'
import Pagination from './common/pagination'


class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageMovies: []
       
     }
     
    /*  showTableMovies=   */
    
    deleteMoviesHandler = (movie)=>{

        const movies = this.state.movies.filter(Onemovie => Onemovie._id!==movie._id )      
        this.setState({ movies }) 
        //movies:movies  -> neu JS if key and value have the same name write it only once 
        
    }
    showTable(){
      const movie=  this.state.movies.map(movie => {
           
            const {_id, title, genre, numberInStock, dailyRentalRate}= movie
 
            return (
               
                <tr key={_id}>
                    <td>{title}</td>
                    <td>{genre.name}</td>
                    <td>{numberInStock}</td>
                    <td>{dailyRentalRate}</td>
                    <td><button onClick={()=>{this.deleteMoviesHandler(movie)}} className="btn btn-danger">Delete</button></td>
                </tr>
                )
 
        } )
        return movie
    }

    pageOne = ()=>{

        console.log('page 1 was clicked')
       // const movies= [...this.state.movies]
        const movies= this.showTable()
        let slicedMov = movies.slice(0,2)
        let counterI=1
        let pageMovies=[]
        let allPageMovies=[]
        console.log(allPageMovies)
        for(let key in movies){
          console.log(key)
         if(counterI%3!=0){

            pageMovies.push(movies[key])
            console.log(counterI)
         }else{
            pageMovies.push(movies[key])
            allPageMovies.push(pageMovies)
            pageMovies=[]
         }
        
          counterI++
        }
       console.log(allPageMovies)
       return allPageMovies
       
    }
  
    goToPage= (index)=>{
        const pageOne=this.pageOne()
       
        console.log(pageOne[index])
        this.setState({
            pageMovies:pageOne[index]
        })
       return pageOne[index]
    }

    showPagination = () => {
    
      const onePage = this.pageOne().map((page,index)=>{
        console.log(page)
       return <li onClick={()=>this.goToPage(index)} className="page-item"><a className="page-link" href="#">{index+1}</a></li>
      })
      return onePage

    }
    showMoviesPages= ()=>{
       if(this.state.pageMovies.length==0 ){
           let movieS= this.pageOne()
           return movieS[0]
       }
       return this.state.pageMovies
    } 

     render() { 
        
        
        console.log(this.state.pageMovies)
  
        if (this.state.movies.length==0)
        return <p>There are no films in the library'</p>

         return ( 
           <React.Fragment>
               <h1>Movies</h1>
            <p>There are {this.state.movies.length} films left in the library</p>

             <table className="table">
                <thead>
                   <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                
         {this.showMoviesPages()}   
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
            <ul className="pagination">
              
                {this.showPagination()}
            </ul>
            </nav>

            <Pagination  / >
            </React.Fragment>
        );
    }
    
   

}
 
export default Movies;