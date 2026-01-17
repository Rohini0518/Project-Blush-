import { Box, Typography } from "@mui/material";
import ProductCard from "../cards/ProductCard";

export default function HomeProductSection(){
const img="https://images.unsplash.com/photo-1713296134277-6917ab5b752f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHx3b21lbiUyMGluZGlhfGVufDB8fDB8fHww"    
    return(<>
    <Box sx={{display:"flex" ,flexDirection:"column",mt:10}}>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Typography variant="h2">sectionTitle</Typography>
      <Typography variant="h4">sectionSubtitle</Typography>
      <Typography sx={{color:"red"}}>(❁´◡`❁)</Typography>
        </Box>

        <Box sx={{m:"10px",width:"80%"}}>
            <ProductCard img={img} productInfo="Pure Mul Cotton Zari angarakha Suit Set with best price " price={1500}/>
        </Box>

    </Box>
    </>)
}