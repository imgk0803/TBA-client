export const  averageRating = (review)=>{
    if(review && review.length > 0){
        const star = review.reduce((acc,rev)=>
            acc + rev.rating,0
            )
           const average =  star/review.length
           return parseFloat(average.toFixed(1))
    }
    return 0
       
}