export const  averageRating = (review)=>{
    if(review && review.length > 0){
        const star = review.reduce((acc,rev)=>
            acc + rev.rating,0
            )
           return star/review.length
    }
    return 0
       
}