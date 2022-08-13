<template>
  <div class="edge">
    <el-select v-model="selectValue" filterable clearable style="width: 200px">
      <el-option
        v-for="item in Object.keys(CONTRIBUTORS_MAP)"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <div>
      <el-button style="width: 200px; margin-top: 10px" @click="toEmpty"
        >无记录人员</el-button
      >
    </div>
    <div>
      <el-button style="width: 200px; margin-top: 10px" @click="onClear"
        >重置</el-button
      >
    </div>
  </div>
  <div class="main">
    <el-table
      v-loading="loading"
      :data="curPage"
      style="width: 100%"
      height="540"
    >
      <el-table-column prop="login" label="昵称">
        <template #default="scope">
          <span @click="() => onCopy(scope.row.html_url)" style="cursor: pointer;" >{{
            scope.row.login
          }}</span>
          <el-button size="small" @click="() => onCopy(scope.row.login)" >CN</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="avatar_url" label="头像">
        <template #default="scope">
          <el-avatar style="cursor: pointer;" @click="() => onCopy(scope.row.avatar_url)" size="small" :src="scope.row.avatar_url" />
        </template>
      </el-table-column>
      <el-table-column prop="target" label="贡献标的">
        <template #default="scope">
          {{
            Array.isArray(scope.row.target) && scope.row.target.length
              ? scope.row.target.join("、")
              : "-"
          }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage"
      :page-size="10"
      :disabled="disabled"
      background
      layout="total, prev, pager, next"
      :total="tableData.length"
      @current-change="currentChange"
    />
  </div>
</template>
<script lang="ts" >
import { ref, onMounted, computed, watch } from "vue";
import jsonp from "jsonp";
import { pick } from "lodash-es";
import { CONTRIBUTORS_MAP } from "../common/commiter";
import { ElMessage } from "element-plus";
import { useClipboard } from '@vueuse/core'
// import ClipBar from "./clipBar.vue";

const KEY = "HELLO_TEST_KEY";
type OBJ = Record<string, unknown>;
const toFormat = (arr: OBJ[]) => {
  return arr.map((item) => {
    const target: string[] = [];
    Object.entries(CONTRIBUTORS_MAP).forEach(([key, values]) => {
      const res = values.some(({ avatar, homepage }) => {
        return avatar === item.avatar_url || homepage === item.html_url;
      });
      if (res) {
        target.push(key);
      }
    });
    return pick(Object.assign(item, { target }), [
      "login",
      "avatar_url",
      "html_url",
      "target",
    ]);
  });
};

export default {
  // components: { ClipBar },
  setup() {
    const sourceData = ref([]);
    const loading = ref(false);
    const disabled = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const selectValue = ref<string | null | 0>(null);
    onMounted(() => {
      const dd = localStorage.getItem(KEY);
      if (dd) {
        try {
          sourceData.value = JSON.parse(dd);
        } catch (error) {
          console.log(error);
        }
      } else {
        loading.value = true;
        jsonp(
          "https://api.github.com/repos/DevCloudFE/vue-devui/contributors?per_page=100",
          null,
          (_, { data }) => {
            console.log(data);
            sourceData.value = data || [];
            localStorage.setItem(KEY, JSON.stringify(data));
            loading.value = false;
          }
        );
      }
    });
    const currentChange = () => {
      disabled.value = true;
      loading.value = true;
      setTimeout(() => {
        disabled.value = false;
        loading.value = false;
      }, 100);
    };

    const onClearPage = () => {
      currentChange();
      currentPage.value = 1;
      pageSize.value = 10;
    };
    const onClear = () => {
      onClearPage();
      selectValue.value = null;
    };
    const toEmpty = () => {
      onClearPage();
      selectValue.value = 0;
    };

    const onError = (e) => {
      console.log(e);
      ElMessage({
        message: `复制失败`,
        type: "success",
      });
    };
    const tableData = computed(() => {
      return toFormat(sourceData.value).filter(({ target }) => {
        if (selectValue.value === null) {
          return true;
        }
        if (selectValue.value === 0) {
          return !Array.isArray(target) || target.length === 0;
        }
        return (target as string[]).includes(selectValue.value);
      });
    });
    const curPage = computed(() => {
      return (tableData.value || []).slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value
      ) as OBJ[];
    });
    watch(curPage, (val) => {
      console.log(val);
    });
    watch(
      () => selectValue,
      (val) => {
        onClearPage();
      }
    );
    const { copy } = useClipboard();
    const onCopy = (text) => {
      copy(text).then(() => {
        ElMessage({
          message: `复制${text}成功`,
          type: "success",
        });  
      });
    };
    return {
      tableData,
      loading,
      currentPage,
      curPage,
      currentChange,
      disabled,
      selectValue,
      CONTRIBUTORS_MAP,
      onClear,
      toEmpty,
      onCopy,
      onError,
    };
  },
};
</script>

<style>
.main {
  width: 800px;
  height: 600px;
  box-shadow: var(--el-box-shadow-dark);
  overflow-y: auto;
  /* margin-top: -200px; */
}
.edge {
  display: flex;
  flex-direction: column;
}
</style>
