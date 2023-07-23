// import {getFirestore,collection, getDocs} from "firebase/firestore"

    const productosApi = async() => {
        let urlConection=""
        if ((process.env.REACT_APP_BACKEND_URL) && (process.env.REACT_APP_BACKEND_URL.length) > 0
        ) {
            urlConection=process.env.REACT_APP_BACKEND_URL+`/api/products`
        } else {
            urlConection=`http://localhost:8080/api/products`
        }

        const productosPromise = await (fetch(urlConection, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then(response => response.json())
            .then((data) => {
                console.log('data',data)
                if (data.docs){    
                    let listProducts=[];    
                    data.docs.map(
                        (doc)=> listProducts.push(doc)
                    )
                     console.log(listProducts);
                     return listProducts       
                    }
            })    
            .catch((error) => {
                console.log(error);
       
            })
        )    
        console.log('productopromise',productosPromise)    
        urlConection=""
        if ((process.env.REACT_APP_BACKEND_URL) && (process.env.REACT_APP_BACKEND_URL.length) > 0
        ) {
            urlConection=process.env.REACT_APP_BACKEND_URL+`/`
        } else {
            urlConection="http://localhost:8080/"
        }

        const productos = productosPromise.map((productos) => ({
                 id:productos._id,
                 category:productos.category,
                 nombre:productos.title,
                 imagen:urlConection+productos.thumpbnail,
                 precio:productos.price,
                 stockProducto:productos.stock,
                 idDoc:productos.code
        }))
        console.log('productos',productos)
        return productos

        // const db=getFirestore();
        // const itemCollectionRef= collection(db,"items")
        // const productoPromise = await (
        //     getDocs(itemCollectionRef).then((snapshot)=>{
        //         let listProducts=[];    
        //         snapshot.docs.map(
        //             (doc)=>{ 
        //                 listProducts.push({...doc.data(),idDoc:doc.id});
        //             }

        //             )
        //         console.log(listProducts);

        //         return listProducts;
        //     })
        // )
      
        // const productos = productoPromise.map((productos) => ({
        //         id:productos.id,
        //         category:productos.category,
        //         nombre:productos.descripcionProducto,
        //         imagen:productos.img,
        //         precio:productos.precioVentaUnitario,
        //         stockProducto:productos.stockProducto,
        //         idDoc:productos.idDoc

        // }))
        
        // return productos
    }

    export const getProductoById= async (id)=>{
        // const db=getFirestore();
        // const itemCollectionRef= collection(db,"items")
        // const unProductoPromise = await (
        //     getDocs(itemCollectionRef).then((snapshot)=>{
        //         let listProducts=[];    
        //         snapshot.docs.map(
        //             (doc)=>{ 
        //                 listProducts.push({...doc.data(),idDoc:doc.id});
        //             }
        //         )
        //         return listProducts;
        //     })
        //)
        let urlConection=""
        if ((process.env.REACT_APP_BACKEND_URL) && (process.env.REACT_APP_BACKEND_URL.length) > 0
        ) {
            urlConection=process.env.REACT_APP_BACKEND_URL+`/api/products/${id}`
        } else {
            urlConection=`http://localhost:8080/api/products/${id}`
        }

        const unProductoPromise = await (fetch(urlConection, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then(response => response.json())
            .then((data) => {
                console.log('data',data)
                if (data){    
                    let listProducts=[];    
                    listProducts.push(data)
                     console.log(listProducts);
                     return listProducts       
                    }
            })    
            .catch((error) => {
                console.log(error);
       
            })
        )    
        console.log('unproductopromise',unProductoPromise)    
        urlConection=""
        if ((process.env.REACT_APP_BACKEND_URL) && (process.env.REACT_APP_BACKEND_URL.length) > 0
        ) {
            urlConection=process.env.REACT_APP_BACKEND_URL+`/`
        } else {
            urlConection="http://localhost:8080/"
        }
      
         const productos = unProductoPromise.map((productos) => ({
                 id:productos._id,
                 category:productos.category,
                 nombre:productos.title,
                 imagen:urlConection+productos.thumpbnail,
                 precio:productos.price,
                 stockProducto:productos.stock,
                 idDoc:productos.code

         }))

         const unProducto=productos.find(element=>element.id===id);   
         console.log(unProducto);
        
         return unProducto

    }
        
    export default productosApi;

        