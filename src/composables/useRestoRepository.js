import { useHttp } from "./useHttp";

export const useRestoRepository = () => {
    const http = useHttp();

    /**
     * Get all resto from teh server
     * 
     * @return array
     */
    const index = () => http.get("/api/restos");

    const index_resto_profile = (id) => http.get(`/api/restos/profile/${id}`)

    /**
     * show specific resto from the database.
     * 
     * @param {number|string} id The id of therecord stored in the database 
     * @returns object
     */
    const show = (id) => http.get(`/api/restos/${id}`);

    /**
     * Store new record to the database 
     * 
     * @param {object} data The data to be stored on the database
     * @returns object
     */
    const store = (data) => http.post("/api/restos", data);

    /**
     *  Update the specified record on the database with the new data
     * 
     * @param {*} id the id of the record stored in the database
     * @param {*} data the data to be stored on the database
     * @returns object
     */
    const update = (id, data) => http.patch(`/api/restos/${id}`, data);

    /**
     * Delete the specified record on the database
     * 
     * @param {*} id The id of the record stored in the database
     * @returns object
     */
    const destroy = (id) => http.destroy(`/api/restos/${id}`);

    /**
     * 
     * @param {*} id The id of the record stored in the database 
     * @returns array
     */
    const reviews = (id) => http.get(`/api/restos/${id}/reviews`);

    return {
        index,
        index_resto_profile,
        show,
        store,
        update,
        destroy,
        reviews,
    };
};