import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import { Button } from 'components/Button';
import { fetchImage } from '../../services/pixabayAPI';
import { Loader } from 'components/Loader';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// console.log(
//   '!!!!!!!!!!!!',
//   await fetchImage(NextsearchKeyword, nextPage)
// );

// function Example() {
//   const notify = () => {
//     toast.error('Error Notification !', {
//       position: toast.POSITION.TOP_LEFT,
//     });
//   };
// }

export class ImageGallery extends Component {
  state = {
    searchKeyword: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevKeyword = prevProps.keyword;
    const nextKeyword = this.props.keyword;
    const PrevSearchKeyword = prevState.searchKeyword;
    const NextsearchKeyword = this.state.searchKeyword;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevPage !== nextPage || PrevSearchKeyword !== NextsearchKeyword) {
      this.setState({
        isLoading: true,
        error: null,
      });

      try {
        const {
          data: { hits, total, totalHits },
        } = await fetchImage(NextsearchKeyword, nextPage);

        if (!total || !hits) {
          return await Promise.reject(
            new Error(`"${NextsearchKeyword}" NOT FOUND !`)
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: nextPage,
          totalHits,
        }));
      } catch (error) {
        this.setState({
          // error: error.message,
          error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }

    if (prevKeyword !== nextKeyword) {
      this.setState({
        searchKeyword: nextKeyword,
        images: [],
        error: null,
        page: 1,
      });
    }
  }

  changePage = () => {
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, totalHits } = this.state;
    const onchangePage = this.changePage;

    console.log('images', images);
    console.log('error', error);

    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </List>

        {!this.state.isLoading && !error && images.length < totalHits && (
          <Button onCLick={onchangePage} />
        )}

        {this.state.isLoading && <Loader />}

        {!this.state.isLoading &&
          images.length > 0 &&
          images.length >= totalHits && <p>END</p>}
        {this.state.error &&
          toast.error(`ERROR: ${error.message}`, {
            position: 'top-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            style: {
              width: '400px',
              color: 'red',
            },
          })}
      </>
    );
  }
}

// function Example() {
//   const notify = () => {
//     toast("Default Notification !");

//     toast.success("Success Notification !", {
//       position: toast.POSITION.TOP_CENTER
//     });

//     toast.error("Error Notification !", {
//       position: toast.POSITION.TOP_LEFT
//     });

//     toast.warn("Warning Notification !", {
//       position: toast.POSITION.BOTTOM_LEFT
//     });

//     toast.info("Info Notification !", {
//       position: toast.POSITION.BOTTOM_CENTER
//     });

//     toast("Custom Style Notification with css class!", {
//       position: toast.POSITION.BOTTOM_RIGHT,
//       className: 'foo-bar'
//     });
//   };
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { Component } from 'react';
// import { ImageGalleryItem } from 'components/ImageGalleryItem';
// import { List } from './ImageGallery.styled';
// import { Button } from 'components/Button';
// import { fetchImage } from '../../services/pixabayAPI';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// export class ImageGallery extends Component {
//   state = {
//     searchKeyword: '',
//     status: Status.IDLE,
//     images: [],
//     error: null,
//     page: 1,
//     totalHits: 0,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevKeyword = prevProps.keyword;
//     const nextKeyword = this.props.keyword;
//     const PrevSearchKeyword = prevState.searchKeyword;
//     const NextsearchKeyword = this.state.searchKeyword;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevPage !== nextPage || PrevSearchKeyword !== NextsearchKeyword) {
//       this.setState({
//         status: Status.PENDING,
//       });

//       try {
//         const {
//           data: { hits, total, totalHits },
//         } = await fetchImage(NextsearchKeyword, nextPage);

//         console.log(
//           '!!!!!!!!!!!!',
//           await fetchImage(NextsearchKeyword, nextPage)
//         );

//         if (!total) {
//           return await Promise.reject(
//             new Error(`"${NextsearchKeyword}" не знайдено !`)
//           );
//         }

//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           status: Status.RESOLVED,
//           page: nextPage,
//           totalHits,
//         }));
//       } catch (error) {
//         this.setState({
//           error: error.message,
//           status: Status.REJECTED,
//         });
//       }
//     }
//     // setTimeout(() => {
//     // }, 30);

//     if (prevKeyword !== nextKeyword) {
//       this.setState({
//         searchKeyword: nextKeyword,
//         status: Status.IDLE,
//         images: [],
//         error: null,
//         page: 1,
//       });
//     }
//   }

//   changePage = () => {
//     this.setState(prevState => ({
//       ...prevState,
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { images, error, totalHits } = this.state;
//     const onchangePage = this.changePage;

//     console.log('images', images);
//     console.log('error', error);

//     return (
//       <>
//         <List>
//           {images.map(image => (
//             <ImageGalleryItem key={image.id} image={image} />
//           ))}
//         </List>
//         {this.state.status !== Status.IDLE &&
//           images.length < totalHits &&
//           this.state.status !== Status.PENDING && (
//             <Button onCLick={onchangePage} />
//           )}
//         {this.state.status !== Status.IDLE &&
//           images.length >= totalHits &&
//           this.state.status !== Status.PENDING && <p>END</p>}
//         {this.state.status === Status.REJECTED && <h1> {error} </h1>}
//       </>
//     );
//   }
// }
