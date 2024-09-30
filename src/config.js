const config = {
      /*   urlApi:'http://localhost:3184', */
       /*   urlApi:'http://10.110.23.11:3184',  */
         urlApi:'https://apicarbon.erdi.cmu.ac.th', 
        token_name:'pos_token',
        headers:() => {
                return{
                headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('pos_token')
                         }
                }
        }
}
export default config;