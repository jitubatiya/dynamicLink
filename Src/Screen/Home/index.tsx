import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import axios from "axios";
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Home = (props: any) => {
    const [data, setData] = useState([])
    const handleDynamicLink = link => {
        if (link != null)
            manageNavigation(link)
        else
            getProudctData();
    };

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        getProudctData();
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (link != null)
                    manageNavigation(link)
            });
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    function manageNavigation(link) {
        var share_id = getParameterByName("share_id", link.url);
        props.navigation.navigate("detailScreen", { id: share_id })
    }
    function getParameterByName(name: any, url: any) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const getProudctData = () => {
        axios.get('https://dummyjson.com/products')
            .then(function (response) {
                if (response.status == 200)
                    setData(response?.data?.products)

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const headerView = () => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.txtLabel}>All Products</Text>
            </View>
        )
    }
    const renderItem = (data: any) => {
        const { item, index } = data
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate("detailScreen", { id: item.id })}
                style={styles.renderView}>
                <Image source={{ uri: item.thumbnail }} style={styles.productImg} resizeMode={"contain"} />
                <View style={styles.txtView}>
                    <Text style={styles.txtTitle}>{item.title}</Text>
                    <Text style={styles.txtDesc}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.main}>
            {headerView()}
            <FlatList
                data={data}
                renderItem={renderItem}
                style={{ flex: 1, marginHorizontal: 20, marginVertical: 10 }}
            />
        </View>
    )
}
export default Home;