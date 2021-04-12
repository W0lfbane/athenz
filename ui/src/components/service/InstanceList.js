/*
 * Copyright The Athenz Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import styled from '@emotion/styled';
import Button from '../denali/Button';
import SearchInput from '../denali/SearchInput';
import Alert from '../denali/Alert';
import RequestUtils from '../utils/RequestUtils';
import InstanceTable from './InstanceTable';
import AddStaticInstances from '../microsegmentation/AddStaticInstances';

const InstanceSectionDiv = styled.div`
    margin: 20px;
`;

const StyledSearchInputDiv = styled.div`
    width: 50%;
`;

const AddContainerDiv = styled.div`
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
`;

export default class InstanceList extends React.Component {
    constructor(props) {
        super(props);
        this.api = props.api;
        this.state = {
            showAddInstance: false,
            instances: props.instances || [],
            errorMessage: null,
            searchText: '',
            error: false,
        };
        this.toggleAddInstance = this.toggleAddInstance.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.reloadInstances = this.reloadInstances.bind(this);
    }

    toggleAddInstance() {
        this.setState({
            showAddInstance: !this.state.showAddInstance,
        });
    }

    componentDidUpdate = (prevProps) => {
        if (
            prevProps.domain !== this.props.domain ||
            prevProps.domain !== this.props.domain
        ) {
            this.setState({
                instances: this.props.instances || [],
                showAddInstance: false,
                errorMessage: null,
                searchText: '',
            });
        }
    };

    reloadInstances() {
        this.api
            .getInstances(
                this.props.domain,
                this.props.service,
                this.props.category
            )
            .then((instances) => {
                this.setState({
                    instances: instances,
                    showAddInstance: false,
                    errorMessage: null,
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: RequestUtils.xhrErrorCheckHelper(err),
                });
            });
    }

    closeModal() {
        this.setState({ showSuccess: null });
    }

    render() {
        let instances = this.state.instances;
        if (this.state.searchText.trim() !== '') {
            instances = this.state.instances.filter((instance) => {
                let temp = instance.ipAddresses.filter((ipAddress) => {
                    return ipAddress.includes(this.state.searchText.trim());
                });
                return temp.length > 0;
            });
        }

        let addStaticInstance = this.state.showAddInstance ? (
            <AddStaticInstances
                api={this.api}
                domain={this.props.domain}
                onSubmit={this.reloadInstances}
                onCancel={this.toggleAddInstance}
                _csrf={this.props._csrf}
                showAddInstance={this.state.showAddInstance}
                service={this.props.service}
            />
        ) : (
            ''
        );

        let searchInput =
            this.state.instances.length > 0 ? (
                <SearchInput
                    dark={false}
                    name='search'
                    fluid={true}
                    value={this.state.searchText}
                    placeholder={'Enter instance ip address'}
                    error={this.state.error}
                    onChange={(event) =>
                        this.setState({
                            searchText: event.target.value,
                            error: false,
                        })
                    }
                />
            ) : (
                'No instances found'
            );
        return (
            <InstanceSectionDiv data-testid='instancelist'>
                <AddContainerDiv>
                    <StyledSearchInputDiv>{searchInput}</StyledSearchInputDiv>
                    {this.props.category == 'static' && (
                        <div>
                            <Button secondary onClick={this.toggleAddInstance}>
                                Add Static Instance
                            </Button>
                            {addStaticInstance}
                        </div>
                    )}
                </AddContainerDiv>
                {this.state.instances.length > 0 && (
                    <InstanceTable
                        instances={instances}
                        api={this.api}
                        domain={this.props.domain}
                        _csrf={this.props._csrf}
                        onSubmit={this.reloadInstances}
                        category={this.props.category}
                    />
                )}
                {this.state.showSuccess ? (
                    <Alert
                        isOpen={this.state.showSuccess}
                        title={this.state.successMessage}
                        onClose={this.closeModal}
                        type='success'
                    />
                ) : null}
            </InstanceSectionDiv>
        );
    }
}