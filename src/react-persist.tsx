import * as React from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

export interface PersistProps {
  name: string;
  data: any;
  debounce?: number;
  onMount: (data: any) => void;
  store?: Storage;
}

export interface PersistState {
  store: Storage;
}

export class Persist extends React.Component<PersistProps, PersistState> {
  static defaultProps = {
    debounce: 300,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      store: this.store(),
    };
  }

  store(): Storage {
    return this.props.store || window.sessionStorage;
  }

  persist = debounce((data: any) => {
    this.state.store.setItem(this.props.name, JSON.stringify(data));
  }, this.props.debounce);

  componentWillReceiveProps({ data }: PersistProps) {
    if (!isEqual(data, this.props.data)) {
      this.persist(data);
    }
  }

  componentDidMount() {
    const data = this.state.store.getItem(this.props.name);
    if (data && data !== null) {
      this.props.onMount(JSON.parse(data));
    }
  }

  render() {
    return null;
  }
}
