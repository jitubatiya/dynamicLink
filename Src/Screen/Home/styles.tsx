
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    //header view
    headerView:{
        flexDirection:"row",
        justifyContent:"center",
        marginHorizontal:20,
        marginTop:20,
        alignItems:"center"
    },
    txtLabel:{
        fontSize:24,
        fontWeight:"400",
        color:"black"
    },
    //renderview
    renderView: { flexDirection: "row", flex: 1, marginBottom: 20 },
    productImg: { height: 80, width: 80, borderRadius: 40 },
    txtView: { alignSelf: "center", marginLeft: 14, flex: 0.9 },
    txtTitle: { color: "black", fontSize: 20, fontWeight: "700" },
    txtDesc: { color: "#05050580", fontSize: 20, fontWeight: "400" }
})
export default styles;