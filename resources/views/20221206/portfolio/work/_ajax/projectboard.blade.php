<div>
    <div class="body-filter">
        <div class="input-group">
            <span class="input-group-text">
                <i class="elo el-search"></i>
            </span>

            <input type="search" class="form-control" id="inputFilterSearch" placeholder="Tìm kiếm...">
        </div>
        <a class="btn-add-project" data-bs-toggle="modal" data-bs-target="#modalAddProject">
            <i class="elo el-plus"></i> Add project
        </a>
        <a class="btn-delete-project">
            <i class="elo el-trash"></i> Delete project
        </a>
        <div class="btn btn-switch-view" type="button">
            @if ($view == 1)
                <i class="elo el-list"></i>
            @elseif($view == 2)
                <i class="elo el-grid"></i>
            @endif
        </div>
    </div>
    @if ($view == 1)
        <div class="project-list">
            <div class="list-items list-table">
                <div class="list-items-header">
                    <div class="item">
                        <div class="item-row">
                            <div class="item-col-12">
                                <p class="p-overline">My plan 3</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-items-body list-append">

                    @foreach ($plan as $project)
                        <div class="card">
                            <div class="item" data-id="28740">
                                <a href="#" class="item-row select-file" data-type="folder" data-src="28740">
                                    <div class="item-col-5">
                                        <h6 class="subtitle-sm file-name">
                                            {{ $project['Title'] }}
                                        </h6>
                                    </div>
                                    <div class="item-col-5">
                                        <p class="p-sm create-day">
                                            {{ $project['creatAt'] }}
                                        </p>
                                    </div>
                                    <div class="item-col-2">

                                        <div class="group-filter">
                                            <div class="btn-edit">
                                                <i class="elo el-pencil"></i>
                                            </div>
                                            <div class="btn-watch">
                                                <i class="elo el-eye"></i>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="list-items list-table">
                <div class="list-items-header">
                    <div class="item">
                        <div class="item-row">
                            <div class="item-col-12">
                                <p class="p-overline">in progress 4</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-items-body">
                    @foreach ($progress as $project)
                        <div class="card">
                            <div class="item" data-id="28740">
                                <a href="#" class="item-row select-file" data-type="folder" data-src="28740">
                                    <div class="item-col-5">
                                        <h6 class="subtitle-sm file-name">
                                            {{ $project['Title'] }}
                                        </h6>
                                    </div>
                                    <div class="item-col-5">
                                        <p class="p-sm">
                                            {{ $project['creatAt'] }}
                                        </p>
                                    </div>
                                    <div class="item-col-2">
                                        <div class="group-filter">
                                            <div class="btn-edit">
                                                <i class="elo el-pencil"></i>
                                            </div>
                                            <div class="btn-watch">
                                                <i class="elo el-eye"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="list-items list-table">
                <div class="list-items-header">
                    <div class="item">
                        <div class="item-row">
                            <div class="item-col-12">
                                <p class="p-overline">Done 4</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-items-body">
                    @foreach ($done as $project)
                        <div class="card">
                            <div class="item" data-id="28740">
                                <a href="#" class="item-row select-file" data-type="folder" data-src="28740">
                                    <div class="item-col-5">
                                        <h6 class="subtitle-sm file-name">
                                            {{ $project['Title'] }}
                                        </h6>
                                    </div>
                                    <div class="item-col-5">
                                        <p class="p-sm">
                                            {{ $project['creatAt'] }}
                                        </p>
                                    </div>
                                    <div class="item-col-2">
                                        <div class="group-filter">
                                            <div class="btn-edit">
                                                <i class="elo el-pencil"></i>
                                            </div>
                                            <div class="btn-watch">
                                                <i class="elo el-eye"></i>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

        </div>
    @elseif($view == 2)
        <div class="project-grid">
            <div class="container-project">
                <p>My plan 3</p>
                @foreach ($plan as $project)
                    <div class="card">
                        <div class="card-header">
                            {{ $project['Title'] }}
                        </div>
                        <div class="card-body">
                            <p>
                                Date created: {{ $project['creatAt'] }}
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
                @foreach ($progress as $project)
                    <div class="card">
                        <div class="card-header">
                            {{ $project['Title'] }}
                        </div>
                        <div class="card-body">
                            <p>
                                Date created: {{ $project['creatAt'] }}
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
                @foreach ($done as $project)
                    <div class="card">
                        <div class="card-header">
                            {{ $project['Title'] }}
                        </div>
                        <div class="card-body">
                            <p>
                                Date created: {{ $project['creatAt'] }}
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
    @endif

    @include('20221206.portfolio.include.modaladd')
    @include('20221206.portfolio.include.modaledit')
</div>
