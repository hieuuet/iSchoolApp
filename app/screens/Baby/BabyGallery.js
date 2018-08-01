import React, { Component, PureComponent } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    UIManager,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import colors from '../../styles/colors';
import HeaderBack from "../../components/HeaderBack";
import Gallery from 'react-native-image-gallery';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class BabyGallery extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
          showGallery: false,
        };
    }

    showGallery = () => this.setState({ showGallery: true })

    hideGallery = () => this.setState({ showGallery: false })

    renderItem = ({item}) => {
      return (
        <TouchableOpacity onPress={this.showGallery} style={styles.rowAlbum}>
          <Image style={styles.thumbAlbum} source={{uri: item.thumb}} />
        </TouchableOpacity>
      )
    }

    render() {
      const listAlbum = [{
        thumb: 'https://i.pinimg.com/736x/c8/1e/96/c81e969bddc3fd049d03929c6b31ffcd--screen-wallpaper-iphone--wallpaper.jpg',
      },
      {
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
      },
      {
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
      },
      {
        thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3f6e5055d9ad1d603fd364c11823d026&w=1000&q=80',
      },
      {
        thumb: 'https://i.pinimg.com/736x/c8/1e/96/c81e969bddc3fd049d03929c6b31ffcd--screen-wallpaper-iphone--wallpaper.jpg',
      },
    ];
        return (
            <View style={{ flex: 1 }} >
              <HeaderBack
                  backgroundColor={'#fd4176'}
                  title={"12/02/2018"}
                  onPressLeft={()=>this.props.navigation.goBack()} />
              <View style={{flex: 1}}>
                <FlatList
                  data={listAlbum}
                  extraData={this.state}
                  keyExtractor={(item, index) => 'item' + index}
                  renderItem={this.renderItem}
                  numColumns={3}
                />
              </View>
              {this.state.showGallery &&
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, backgroundColor: 'black' }}>
                    <TouchableOpacity onPress={this.hideGallery} style={{ position: 'absolute', top: 10, left: 10, padding: 10, zIndex: 100}}>
                        <Text style={{color: 'white', fontSize: 40, fontWeight: '500', opacity: 0.8}}>
                            ×
                        </Text>
                    </TouchableOpacity>
                    <Gallery
                        style={{ flex: 1, backgroundColor: 'black' }}
                        images={[
                        { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                        { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                        { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                        { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                        ]}
                    />
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  rowAlbum: {
    width:( width - 60)/3, 
    marginLeft: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  thumbAlbum: {
    width: (width - 60)/3, 
    height: (width - 60)/3,
  },
  titleAlbum: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  }
});


export default BabyGallery;

