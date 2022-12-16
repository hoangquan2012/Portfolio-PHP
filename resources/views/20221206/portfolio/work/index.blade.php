@extends('20221206.layout.portfolio')
@section('title')
My project
@endsection
@section('view')
<div class="content">
    <div class="content-header">
        <h1 class='title-work'>
            Project board
        </h1>
        <div>
            <div class="input-group">
                <span class="input-group-text">
                    <i class="elo el-search"></i>
                </span>

                <input type="search" class="form-control" id="inputFilterSearch" placeholder="Tìm kiếm...">
            </div>
            <div class="btn-add-project">
                <i class="elo el-plus"></i> Add project
            </div>
            <div class="btn-delete-project">
                <i class="elo el-trash"></i> Delete project
            </div>
            <div class="form-check-group">
						
						<div class="form-switch">
							<input type="checkbox">
							<label data-toggle="check" data-type="switch">
								<div class="btn-switch btn-switch-secondary active">
									<div class="control"></div>
								</div>
							</label>
						</div>
					</div>
        </div>
    </div>
    <div class="content-body">
        <div class="container-project">
            <p>My plan 3</p>
            @php
            $project_type = [
            0 => [
            'Title' => 'Learn Backend',
            'creatAt' => '20/12/1999',
            ],
            1 => [
            'Title' => 'Learn IETLS',
            'creatAt' => '20/12/1999',
            ],
            2 => [
            'Title' => 'FullStack',
            'creatAt' => '20/12/1999',
            ],
            ];
            @endphp
            @foreach($project_type as $project)
            <div class="card">
                <div class="card-header">
                    {{$project['Title']}}
                </div>
                <div class="card-body">
                    <p>
                        Date created: {{$project['creatAt']}}
                    </p>
                    <div>
                        <div class="btn-edit">
                            <i class="elo el-pencil"></i>
                        </div>
                        <div class="btn-watch">
                            <i class="elo el-eye"></i>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="container-project">
            <p>in progress 4</p>
            @php
            $project_type = [
            0 => [
            'Title' => 'Learn Fronted',
            'creatAt' => '20/12/1999',
            ],
            1 => [
            'Title' => 'Learn JS',
            'creatAt' => '20/12/1999',
            ],
            2 => [
            'Title' => 'Learn more English',
            'creatAt' => '20/12/1999',
            ],
            3 => [
            'Title' => 'Learn Sth',
            'creatAt' => '20/12/1999',
            ],
            ];
            @endphp
            @foreach($project_type as $project)
            <div class="card">
                <div class="card-header">
                    {{$project['Title']}}
                </div>
                <div class="card-body">
                    <p>
                        Date created: {{$project['creatAt']}}
                    </p>
                    <div>
                        <div class="btn-edit">
                            <i class="elo el-pencil"></i>
                        </div>
                        <div class="btn-watch">
                            <i class="elo el-eye"></i>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="container-project">
            <p>Done 4</p>
            @php
            $project_type = [
            0 => [
            'Title' => 'Toeic 600',
            'creatAt' => '20/12/1999',
            ],
            1 => [
            'Title' => 'NextJs',
            'creatAt' => '20/12/1999',
            ],
            2 => [
            'Title' => 'Ant design',
            'creatAt' => '20/12/1999',
            ],
            3 => [
            'Title' => 'Type Script',
            'creatAt' => '20/12/1999',
            ],
            ];
            @endphp
            @foreach($project_type as $project)
            <div class="card">
                <div class="card-header">
                    {{$project['Title']}}
                </div>
                <div class="card-body">
                    <p>
                        Date created: {{$project['creatAt']}}
                    </p>
                    <div>
                        <div class="btn-edit">
                            <i class="elo el-pencil"></i>
                        </div>
                        <div class="btn-watch">
                            <i class="elo el-eye"></i>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection

@section('css')
<link rel="stylesheet" href="{{ asset('scss/20221206/portfolio/page/work.css') }}">
@endsection