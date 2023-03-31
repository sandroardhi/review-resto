import { useHttp } from "./useHttp";

export const useReviewRepository = () => {
    const http = useHttp();

    const index = () => http.get('/api/reviews');

    const store = (data) => http.post('/api/reviews', data);

    const update =  (id, data) => http.post(`/api/reviews/${id}`, data);
    
    const destroy = (id) => http.destroy(`/api/restos/${id}`);

    return {
        index,
        store, 
        update,
        destroy
    };
}