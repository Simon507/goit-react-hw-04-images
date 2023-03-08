import axios from 'axios';
import { Component } from 'react';
import { Toaster } from '../Toaster';
import Loader from '../loader/Loader';
import { LoaderBox } from './searchQuerry.styles';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class SearchQuerry extends Component {
  state = {
    isLoading: false,
    errorMessage: null,
    // targetPage: 1,
    // targetFind: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    let currentPage = this.props.page;

    // if (
    //   prevProps.target === this.props.target ||
    //   prevProps.page !== this.props.page
    // ) {
    //   this.setState({ targetPage: 1 });
    // }
    if (
      prevProps.target !== this.props.target ||
      prevProps.page !== this.props.page
    ) {
      currentPage = this.props.page;
      this.setState({ isLoading: true });

      await axios
        .get(
          `?q=${this.props.target}&page=${currentPage}&key=32355141-118a8dcb9c7f98144e9365121&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(obj => {
          if (obj.data.hits.length === 0) {
            this.setState({
              errorMessage:
                'There are no images for this request, please try another one!!!',
            });
            return;
          } else {
            this.props.onFind(obj.data.hits, obj.data.totalHits);
          }
        })
        .catch(error => {
          this.setState({ errorMessage: error });
        })
        .finally(this.setState({ isLoading: false }));
    }
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <Toaster message={this.state.errorMessage} />
        )}

        {this.state.isLoading && (
          <LoaderBox>
            <Loader />
          </LoaderBox>
        )}
      </>
    );
  }
}
