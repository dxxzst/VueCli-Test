<template>
    <div class="menu-wrapper" v-if="!item.hidden&&item.children">

        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <app-link :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="resolvePath(onlyOneChild.path)">
                    <item :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" v-if="onlyOneChild.meta"/>
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu :index="resolvePath(item.path)" v-else>
            <template slot="title">
                <item :icon="item.meta.icon" :title="item.meta.title" v-if="item.meta"/>
            </template>

            <template v-for="child in item.children">
                <template v-if="!child.hidden">
                    <sidebar-item :base-path="resolvePath(child.path)" :is-nest="true" :item="child" :key="child.path" class="nest-menu" v-if="child.children&&child.children.length>0"/>
                    <app-link :key="child.name" :to="resolvePath(child.path)" v-else>
                        <el-menu-item :index="resolvePath(child.path)">
                            <item :icon="child.meta.icon" :title="child.meta.title" v-if="child.meta"/>
                        </el-menu-item>
                    </app-link>
                </template>
            </template>
        </el-submenu>

    </div>
</template>

<script>
    import path from 'path'
    import {validateURL} from '@/utils/validate'
    import Item from './Item'
    import AppLink from './Link'

    export default {
        name: 'SidebarItem',
        components: {Item, AppLink},
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                onlyOneChild: null
            }
        },
        methods: {
            hasOneShowingChild(children, parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                if (this.isExternalLink(routePath)) {
                    return routePath
                }
                return path.resolve(this.basePath, routePath)
            },
            isExternalLink(routePath) {
                return validateURL(routePath)
            }
        }
    }
</script>
