<template>
  <div
    class="page-container"
    :class="[
      pagePanelHiding == false ? 'page-container' : 'page-container-hide',
    ]"
  >
    <InspectionRecordPanel @showHidePanel="SHOW_HIDE_PANEL" @viewItem="VIEW_ITEM" />
    <div class="list-page" v-if="this.id_inspection_record != ''">
      <v-ons-list>
        <v-ons-list-header>
          Inspection Detail of
          <b>{{ DATE_FORMAT(current_view.inspection_date) }}</b>
        </v-ons-list-header>
      </v-ons-list>
      <div class="tab-wrapper">
        <vue-tabs-chrome v-model="tabCurrent" :tabs="tabs" />
      </div>
      <div v-if="tabCurrent == 'data'" class="tab1-grid">
        <div class="content">
          <div class="table-wrapper">
            <DxDataGrid
              id="shell-settlement-point-table"
              key-expr="id_eval"
              :data-source="shellPointList"
              :element-attr="dataGridAttributes"
              :selection="{ mode: 'single' }"
              :hover-state-enabled="true"
              :allow-column-reordering="true"
              :show-borders="true"
              :show-row-lines="true"
              :row-alternation-enabled="false"
              :word-wrap-enabled="true"
              @row-updated="UPDATE"
              @row-removed="DELETE"
            >
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />

              <DxEditing
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="false"
                :use-icons="true"
                mode="row"
              />

              <DxToolbar>
                <DxItem location="before" template="table-header" />
                <DxItem location="after" template="table-header-button-set" />
              </DxToolbar>

              <DxColumn
                data-field="location"
                caption="Evaluation Location at the Tank (Mark on shell map)"
                :allow-editing="false"
              />

              <DxColumn
                data-field="ui_active"
                caption="UI Active"
                :allow-editing="false"
                :width="80"
              />

              <DxColumn
                data-field="maximum_space"
                caption="Distance Between Survey Location (mm)"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="cumulative"
                caption="Cumulative Distance Around Tank (mm)"
                format="#,##0.00"
                :allow-editing="false"
              />

              <DxColumn
                data-field="relative_value"
                caption="Relative Level/Distance Above Datum Point (mm)"
                format="#,##0.00"
              />

              <DxColumn type="buttons">
                <!-- <DxButton hint="View CML" icon="search" :on-click="VIEW_CML" /> -->
                <DxButton name="edit" hint="Edit" icon="edit" />
                <DxButton name="delete" hint="Delete" icon="trash" />
              </DxColumn>

              <template #table-header>
                <div class="dx-table-style">
                  <div class="table-header-label">Evaluation Points</div>
                </div>
              </template>
              <template #table-header-button-set>
                <div class="dx-table-style">
                  <div class="table-toolbar-set">
                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="OPEN_ADD()"
                      v-if="shellPointIsEmpty.length == 0"
                    >
                      <i class="las la-plus"></i>
                      <span>Create New Points</span>
                    </v-ons-toolbar-button>

                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="DELETE_POINT()"
                      v-if="shellPointIsEmpty.length > 0"
                    >
                      <i class="las la-trash"></i>
                      <span>Delete All Points</span>
                    </v-ons-toolbar-button>

                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="OPEN_EDIT()"
                      v-if="shellPointIsEmpty.length > 0"
                    >
                      <i class="las la-edit"></i>
                      <span>Edit UI Active</span>
                    </v-ons-toolbar-button>
                  </div>
                </div>
              </template>

              <!-- Configuration goes here -->
              <!-- <DxFilterRow :visible="true" /> -->
              <DxScrolling mode="standard" />
              <DxSearchPanel :visible="false" />
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20, 50]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
              />
              <!-- <DxExport :enabled="true" /> -->
            </DxDataGrid>
          </div>
        </div>
        <div class="app-instruction" style="padding-top: 20px; padding-left: 20px">
          <appInstruction
            title="Measurement Conceptualization"
            desc="Measurements of Shell Settlement (External)"
          >
            <ol>
              <li>
                There must be at least 8 settlement points. The maximum spacing
                of settlement point is 32 ft. (9.7536 m) around the
                circumference.
              </li>
              <li>
                Points shall be equally spaced around the tank shell. There must
                be at least 4 equally spaced diametrical measurements.
              </li>
              <li>The spacing settlement and quantity of measurement points</li>
            </ol>
          </appInstruction>
          <appInstruction style="margin-top: 20px" title="The Maximum Spacing of Settlement Points">
            <div class="img-box">
              <img src="/img/tank-shell-max-space-settlement.png" />
            </div>
          </appInstruction>
          <appInstruction style="margin-top: 20px" title="Datum Point Location">
            <label class="desc">
              Settlement surveys are in general not carried out on small diameter tanks because,
              due to less weight of the product, the tanks are less susceptible to developing issues with settlement.
              Several internationally used specifications specify to carry out settlement surveys only for tanks with a diameter bigger than 9.75 m.
              If API 653 acceptance criteria are calculated for small diameter tanks the acceptance range will be very tight due to the small arc length between measurement points.
            </label>

            <label class="desc" style="margin-top:15px">
              The acceptance criteria as per API 653 for this tank was found to be unacceptable.
              The results were also compared to the European tank inspection standard EEMUA 159.
              When the settlement is compared to the European standard the result is found to be within acceptance.
            </label>
          </appInstruction>
        </div>
      </div>
      <div v-if="tabCurrent == 'cal'" class="tab2-grid">
        <div v-if="this.settlementCalPointList.length > 0">
          <div class="content">
            <div class="table-wrapper">
              <DxDataGrid
                id="settlement-2-grid"
                key-expr="id_eval"
                :data-source="settlementCalPointList"
                :element-attr="dataGridAttributes"
                :selection="{ mode: 'single' }"
                :hover-state-enabled="true"
                :allow-column-reordering="true"
                :show-borders="true"
                :show-row-lines="true"
                :row-alternation-enabled="false"
                :word-wrap-enabled="true"
              >
                <DxFilterRow :visible="true" />
                <DxHeaderFilter :visible="true" />

                <DxToolbar>
                  <DxItem location="before" template="table-header" />
                  <!-- <DxItem location="after" template="table-header-button-set" /> -->
                </DxToolbar>

                <DxColumn data-field="location" caption="Data Point" :allow-editing="false" />

                <DxColumn
                  data-field="cumulative"
                  caption="Circumferential Distance"
                  format="#,##0.00"
                  :allow-editing="false"
                />

                <DxColumn
                  data-field="reduced_level"
                  caption="Reduced Level"
                  format="#,##0.00"
                  :allow-editing="false"
                />

                <DxColumn data-field="theta_radians" caption="Theta Radians" format="#,##0.00" />

                <DxColumn data-field="theta_degrees" caption="Theta Degrees" format="#,##0.00" />

                <DxColumn data-field="relative_value" caption="Relative Level" format="#,##0.00" />

                <DxColumn data-field="y" caption="Y=A+B Cos(Theta-C)" format="#,##0.00" />

                <DxColumn
                  data-field="difference_value"
                  caption="Difference (Ui)"
                  format="#,##0.00"
                />

                <DxColumn
                  data-field="out_of_plane"
                  caption="Out of Plane Deflection (Si)"
                  format="#,##0.00"
                />

                <DxColumn data-field="deviation_value" caption="Deviation" format="#,##0.00" />

                <DxColumn
                  data-field="difference_2_value"
                  caption="Difference(2)"
                  format="#,##0.00"
                />

                <DxColumn data-field="deviation_2_value" caption="Deviation(2)" format="#,##0.00" />

                <template #table-header>
                  <div class="dx-table-style">
                    <div class="table-header-label">Settlement Calculation</div>
                  </div>
                </template>
                <!-- <template #table-header-button-set>
                <div class="dx-table-style">
                  <div class="table-toolbar-set">
                    <v-ons-toolbar-button
                      class="table-toolbar-btn"
                      v-on:click="DELETE_POINT()"
                      v-if="shellPointIsEmpty.length > 0"
                    >
                      <i class="las la-trash"></i>
                      <span>Clear Input</span>
                    </v-ons-toolbar-button>
                  </div>
                </div>
                </template>-->

                <!-- Configuration goes here -->
                <!-- <DxFilterRow :visible="true" /> -->
                <DxScrolling mode="standard" />
                <DxSearchPanel :visible="false" />
                <DxPaging :page-size="10" :page-index="0" />
                <DxPager
                  :show-page-size-selector="true"
                  :allowed-page-sizes="[5, 10, 20]"
                  :show-navigation-buttons="true"
                  :show-info="true"
                  info-text="Page {0} of {1} ({2} items)"
                />
                <!-- <DxExport :enabled="true" /> -->
              </DxDataGrid>
            </div>
            <div class="report-sheet">
              <!-- <div class="custom-table-header">
                <label></label>
              </div>-->
              <div
                class="report-container"
                style="display: grid; grid-template-columns: 50% 50%; gap: 20px; width: calc(100% - 20px);"
              >
                <div class="sheet-body" style="border: none;">
                  <div class="section-label" style="grid-column: span 4">
                    <label style="line-height: 34px">Y = A + B Cos(Theta - C)</label>
                  </div>
                  <div class="section-label">
                    <label></label>
                  </div>
                  <div class="section-label">
                    <label>A</label>
                  </div>
                  <div class="section-label">
                    <label>B</label>
                  </div>
                  <div class="section-label">
                    <label>C</label>
                  </div>
                  <div class="form-item" style="grid-row: span 2">
                    <div class="form-item-label">
                      <label style="font-weight: 500">Calc.</label>
                    </div>
                    <div class="form-item-label">
                      <label style="font-weight: 500">Manual</label>
                    </div>
                  </div>
                  <div class="form-item" style="grid-row: span 2">
                    <div class="form-item-label">
                      <label
                        v-if="
                          settlementCalPointList.length == 0 ||
                          !settlementCalPointList[0].asv
                        "
                      >N/A</label>
                      <label
                        v-if="
                          settlementCalPointList.length > 0 &&
                          this.settlementCalPointList[0].asv
                        "
                      >
                        {{
                        this.settlementCalPointList[0].asv.toFixed(4)
                        }}
                      </label>
                    </div>
                    <div class="form-item-value">
                      <input v-model="formData.multi.abf" v-on:keyup.enter="EDIT_CALC()" />
                    </div>
                  </div>
                  <div class="form-item" style="grid-row: span 2">
                    <div class="form-item-label">
                      <label
                        v-if="
                          settlementCalPointList.length == 0 ||
                          !settlementCalPointList[0].bsv
                        "
                      >N/A</label>
                      <label
                        v-if="
                          settlementCalPointList.length > 0 &&
                          this.settlementCalPointList[0].bsv
                        "
                      >
                        {{
                        this.settlementCalPointList[0].bsv.toFixed(4)
                        }}
                      </label>
                    </div>
                    <div class="form-item-value">
                      <input v-model="formData.multi.bbf" v-on:keyup.enter="EDIT_CALC()" />
                    </div>
                  </div>
                  <div class="form-item" style="grid-row: span 2">
                    <div class="form-item-label">
                      <label
                        v-if="
                          settlementCalPointList.length == 0 ||
                          !settlementCalPointList[0].csv
                        "
                      >N/A</label>
                      <label
                        v-if="
                          settlementCalPointList.length > 0 &&
                          this.settlementCalPointList[0].csv
                        "
                      >
                        {{
                        this.settlementCalPointList[0].csv.toFixed(4)
                        }}
                      </label>
                    </div>
                    <div class="form-item-value">
                      <input v-model="formData.multi.cbf" v-on:keyup.enter="EDIT_CALC()" />
                    </div>
                  </div>
                </div>
                <div class="sheet-body">
                  <div class="section-label" style="grid-column: span 4">
                    <label>Sum of Deviation (Syy)</label>
                  </div>
                  <div class="form-item" style="grid-column: span 4">
                    <div class="form-item-label">
                      <label
                        style="line-height: 34px"
                        v-if="
                          settlementCalPointList.length > 0 &&
                          settlementCalPointList[0].syy
                        "
                      >
                        {{
                        this.settlementCalPointList[0].syy.toFixed(2)
                        }}
                      </label>
                      <label
                        style="line-height: 34px"
                        v-if="
                          settlementCalPointList.length == 0 ||
                          !settlementCalPointList[0].syy
                        "
                      >N/A</label>
                    </div>
                  </div>
                  <div class="section-label" style="grid-column: span 4">
                    <label>Sum of Different (SSE)</label>
                  </div>
                  <div class="form-item" style="grid-column: span 4">
                    <div class="form-item-label">
                      <label
                        style="line-height: 34px"
                        v-if="
                          settlementCalPointList.length > 0 &&
                          settlementCalPointList[0].sse
                        "
                      >
                        {{
                        this.settlementCalPointList[0].sse.toFixed(2)
                        }}
                      </label>
                      <label
                        style="line-height: 34px"
                        v-if="
                          settlementCalPointList.length == 0 ||
                          !settlementCalPointList[0].sse
                        "
                      >N/A</label>
                    </div>
                  </div>
                  <div class="section-label" style="grid-column: span 4">
                    <label>R&#178; = (Syy - SSE)/Syy</label>
                  </div>
                  <div class="form-item" style="grid-column: span 4">
                    <div class="form-item-label">
                      <label
                        style="line-height: 34px"
                        v-if="
                          settlementCalPointList.length > 0 &&
                          settlementCalPointList[0].r_2
                        "
                      >
                        {{
                        this.settlementCalPointList[0].r_2.toFixed(4)
                        }}
                      </label>
                      <label
                        style="line-height: 34px"
                        v-if="
                          settlementCalPointList.length == 0 ||
                          !settlementCalPointList[0].r_2
                        "
                      >N/A</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Chart-->

          <div
            style="display: grid; grid-template-columns: 50% 50%; grid-gap: 20px; width: calc(100% - 20px);"
          >
            <div class="upload-graph">
              <chartShellSettlement1
                :current_view="this.current_view"
                :key="this.formData.multi.r_2"
              />

              <DxFileUploader
                select-button-text="Select File"
                label-text="or Drop an image here"
                upload-mode="useForm"
                :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png']"
                accept="image/*"
                ready-to-upload-message="UPLOAD SUCCESSFULLY"
                @value-changed="VALUE_CHANGE"
                v-if="chart_1==0"
              />
              <div
                v-if="chart_1!=0"
                style="margin-top: 10px; border: 1px solid #000; border-radius: 6px; position: relative;"
              >
                <img
                  :src="baseURL + chart_img_1"
                  width="100%"
                  height="200"
                  style="margin-top: 5px;"
                />
                <button
                  style="position:absolute; top: 5px; right: 5px;"
                  v-on:click="DELETE_CHART(1)"
                >
                  <i class="las la-trash"></i>
                </button>
              </div>
            </div>
            <div class="upload-graph">
              <chartShellSettlement2
                :current_view="this.current_view"
                :key="this.formData.multi.sse"
              />
              <!-- <v-ons-toolbar-button id="upload" v-on:click="UPLOAD()">
                <i class="las la-upload"></i>
                <span>UPLOAD GRAPH TO REPORT</span>
              </v-ons-toolbar-button>-->
              <DxFileUploader
                select-button-text="Select File"
                label-text="or Drop an image here"
                upload-mode="useForm"
                ready-to-upload-message="UPLOAD SUCCESSFULLY"
                :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png']"
                accept="image/*"
                @value-changed="VALUE_CHANGE2"
                v-if="chart_2==0"
              />
              <div
                v-if="chart_2!=0"
                style="margin-top: 10px; border: 1px solid #000; border-radius: 6px; position: relative;"
              >
                <img
                  :src="baseURL + chart_img_2"
                  width="100%"
                  height="200"
                  style="margin-top: 5px;"
                />
                <button
                  style="position:absolute; top: 5px; right: 5px;"
                  v-on:click="DELETE_CHART(2)"
                >
                  <i class="las la-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="app-instruction" style="margin-top: 20px">
            <appInstruction
              title="Tank Settlement Evaluation Acceptance criteria as per API 653"
              desc
            >
              <label class="desc">
                When using the procedure with an optimal cosine curve approach
                defined in B.2.2.4 to determine out-of plane settlement, the
                permissible out-of-plane settlement is given by the following
                equation (see Note): Allowance settlement calculated from: Smax,
                ft = (L² x Y x 11)/2EH Where Smax, ft is permissible
                out-of-plane settlement, in feet (ft); L is arc length between
                measurement points, in feet (ft); Y is yield strength of the
                shell material, in pound force per square inch (lbf/in.2); E is
                Young’s Modulus, in pound force per square inch (lbf/in.2); H is
                tank height, in feet (ft). Out-of-plane deflection for Point “i”
                is St or Si = Ui – (0.5Ui - 1 + 0.5 Ui + 1) Where Ui is
                out-of-plane settlement of Point, “i” St is Actual settlement
              </label>
            </appInstruction>
          </div>
          <div class="app-instruction" style="margin-top: 20px">
            <appInstruction title="Acceptance criteria per API 653" desc>
              <label class="desc">
                The maximum of out-of-plane deflection, where the greatest
                deviation of the bottom from the optimum cosine curve over the
                shortest interval between measurements, shall not exceed the
                maximum permissible out-of-plane deflection calculated from
                formula in B3.2 Acceptable where St ≤ Smax (Integrity status is
                Green) Not acceptable where St > Smax (Integrity status is Red)
              </label>
            </appInstruction>
          </div>
        </div>
        <noticeMessage
          v-if="this.settlementCalPointList.length == 0"
          icon="las la-plus"
          message="No evaluation points created. Please create points in 'Settlement Evaluation Data' Tab. "
        />
      </div>
      <div v-if="tabCurrent == 'ad'" class="tab3-grid">
        <div v-if="this.acceptDetInfo">
          <div class="custom-table-header">
            <label>Acceptance Determination</label>
          </div>
          <div class="content">
            <div class="report-sheet">
              <div class="report-container">
                <div class="sheet-body">
                  <div class="section-label" style="grid-column: span 2">
                    <label style="line-height: 34px">
                      API 653, Paragraph B.3 - Determination of Permissible
                      Out-of-Plane Settlement
                    </label>
                  </div>
                  <div class="section-label" style="grid-row: span 2">
                    <label style="line-height: 14px">
                      API 653, Paragraph B.3 - Determination of Permissible
                      Out-of-Plane Settlement
                    </label>
                  </div>
                  <div class="section-label">
                    <label>The optimal cosine curve is valid</label>
                  </div>
                  <div class="section-label">
                    <label>The optimal cosine curve is invalid</label>
                  </div>
                  <div class="content-wrapper">
                    <div class="formula-container">
                      <img src="/img/formula/opt-cosine-valid.svg" />
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>L :</b> Arc length between measurement points
                          (ft)(Max. 32 feet)
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.l_value">-</label>
                        <label v-if="acceptanceDetermination.l_value">
                          {{
                          acceptanceDetermination.l_value.toFixed(2)
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>Y :</b> Yield strength (lbf/in2) (Min Specified
                          Yield Stress [lbf/in2]Obtained from API653 Table
                          4.1)
                        </label>
                      </div>
                      <div class="form-item-value">
                        <input v-model="acceptDetInfo.yield" v-on:keyup.enter="EDIT_ACCPT()" />
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>E :</b> Youngs Modulus (lbf/in2) (30.7 E, 106
                          psi)(Metals handbook, constant for Mild Steel)
                        </label>
                      </div>
                      <div class="form-item-value">
                        <input v-model="acceptDetInfo.e" v-on:keyup.enter="EDIT_ACCPT()" />
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>H :</b> Tank Height (ft) (Obtained from Tank
                          Data)
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label>
                          {{
                          acceptanceDetermination.tank_height_ft
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>n :</b> Number of measurement points
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label>{{ acceptanceDetermination.points }}</label>
                      </div>
                    </div>
                    <div
                      class="form-item"
                      style="display: flex;justify-content: center;padding-top: 40px;"
                    >
                      <div class="form-item-label">
                        <label>
                          <b>
                            S
                            <sub>max</sub>
                          </b>
                        </label>
                      </div>
                      <div class="form-item-unit" style="width: 130px">
                        <label v-if="!acceptanceDetermination.deflection_ft">-</label>
                        <label v-if="acceptanceDetermination.deflection_ft">
                          {{
                          acceptanceDetermination.deflection_ft.toFixed(2)
                          }}
                        </label>
                      </div>
                      <div class="form-item-label">
                        <label>
                          <b>
                            ft
                            &nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;
                          </b>
                        </label>
                      </div>
                      <div class="form-item-unit" style="width: 130px">
                        <label v-if="!acceptanceDetermination.deflection_mm">-</label>
                        <label v-if="acceptanceDetermination.deflection_mm">
                          {{
                          acceptanceDetermination.deflection_mm.toFixed(2)
                          }}
                        </label>
                      </div>
                      <div class="form-item-label">
                        <label>
                          <b>mm</b>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="content-wrapper">
                    <div class="formula-container">
                      <img src="/img/formula/opt-cosine-invalid.svg" />
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>K :</b> API 653, Paragraph B.3.2.2
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label>{{ acceptanceDetermination.k_value }}</label>
                      </div>
                    </div>
                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>
                            S
                            <sub>arc</sub> :
                          </b>Effective settlement arc, see
                          B.2.2.5.1 (ft)
                        </label>
                      </div>
                      <div class="form-item-value">
                        <input v-model="acceptDetInfo.s_arc" v-on:keyup.enter="EDIT_ACCPT()" />
                      </div>
                    </div>

                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>D :</b> Tank inside diameter (ft)
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label>{{ acceptanceDetermination.diameter_ft }}</label>
                      </div>
                    </div>

                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>H :</b> Tank Height (ft) (Obtained from Tank
                          Data)
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label>
                          {{
                          acceptanceDetermination.tank_height_ft
                          }}
                        </label>
                      </div>
                    </div>

                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>Y :</b> Yield strength (lbf/in2) (Min Specified
                          Yield Stress [lbf/in2]Obtained from API653 Table
                          4.1)
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.yield">-</label>
                        <label v-if="acceptanceDetermination.yield">
                          {{
                          acceptanceDetermination.yield
                          }}
                        </label>
                      </div>
                    </div>

                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>E :</b> Youngs Modulus (lbf/in2) (30.7 E, 106
                          psi)(Metals handbook, constant for Mild Steel)
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.e">-</label>
                        <label v-if="acceptanceDetermination.e">
                          {{
                          acceptanceDetermination.e
                          }}
                        </label>
                      </div>
                    </div>

                    <div class="form-item">
                      <div class="form-item-label">
                        <label>
                          <b>n :</b> Number of measurement points
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label>{{ acceptanceDetermination.points }}</label>
                      </div>
                    </div>

                    <div
                      class="form-item"
                      style="
                        display: flex;
                        justify-content: center;
                        padding-top: 40px;
                      "
                    >
                      <div class="form-item-label">
                        <label>
                          <b>
                            S
                            <sub>max</sub>
                          </b>
                        </label>
                      </div>
                      <div class="form-item-unit" style="width: 130px">
                        <label v-if="!acceptanceDetermination.s_max_in">-</label>
                        <label v-if="acceptanceDetermination.s_max_in">
                          {{
                          acceptanceDetermination.s_max_in
                          }}
                        </label>
                      </div>
                      <div class="form-item-label">
                        <label>
                          <b>
                            in
                            &nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;
                          </b>
                        </label>
                      </div>
                      <div class="form-item-unit" style="width: 130px">
                        <label v-if="!acceptanceDetermination.s_max_mm">-</label>
                        <label v-if="acceptanceDetermination.s_max_mm">
                          {{
                          acceptanceDetermination.s_max_mm
                          }}
                        </label>
                      </div>
                      <div class="form-item-label">
                        <label>
                          <b>mm</b>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="content-wrapper">
                    <div class="formula-container">
                      <img src="/img/formula/out-of-plane-settlement.svg" />
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label style="text-align: right">
                          U
                          <sub>i</sub> &nbsp;&nbsp;&nbsp;&nbsp;=
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.ui_max">-</label>
                        <label v-if="acceptanceDetermination.ui_max">
                          {{
                          acceptanceDetermination.ui_max.toFixed(2)
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label style="text-align: right">
                          U
                          <sub>i-1</sub> &nbsp;&nbsp;&nbsp;&nbsp;=
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.ui_before_max">-</label>
                        <label v-if="acceptanceDetermination.ui_before_max">
                          {{
                          acceptanceDetermination.ui_before_max.toFixed(2)
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label style="text-align: right">
                          U
                          <sub>i+1</sub> &nbsp;&nbsp;&nbsp;&nbsp;=
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.ui_next_max">-</label>
                        <label v-if="acceptanceDetermination.ui_next_max">
                          {{
                          acceptanceDetermination.ui_next_max.toFixed(2)
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label style="text-align: right">S&nbsp;&nbsp;&nbsp;&nbsp;=</label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.st_value">-</label>
                        <label v-if="acceptanceDetermination.st_value">
                          {{
                          acceptanceDetermination.st_value.toFixed(2)
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label style="text-align: right">
                          R
                          <sup>2</sup> &nbsp;&nbsp;&nbsp;&nbsp;=
                        </label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.r_2">-</label>
                        <label v-if="acceptanceDetermination.r_2">
                          {{
                          acceptanceDetermination.r_2.toFixed(2)
                          }}
                        </label>
                      </div>
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label
                          style="text-align: right"
                        >Predicted deflection (tilt) &nbsp;&nbsp;&nbsp;&nbsp;=</label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.predicted_tilt">-</label>
                        <label v-if="acceptanceDetermination.predicted_tilt">
                          {{
                          acceptanceDetermination.predicted_tilt.toFixed(2)
                          }}
                        </label>
                      </div>
                      <div class="form-item-label">
                        <label>mm</label>
                      </div>
                    </div>
                    <div class="form-item" style="grid-template-columns: auto 120px 50px">
                      <div class="form-item-label">
                        <label style="text-align: right">at</label>
                      </div>
                      <div class="form-item-unit">
                        <label v-if="!acceptanceDetermination.direction_degrees_cw_pi">-</label>
                        <label v-if="acceptanceDetermination.direction_degrees_cw_pi">
                          {{
                          acceptanceDetermination.direction_degrees_cw_pi.toFixed(
                          2
                          )
                          }}
                        </label>
                      </div>
                      <div class="form-item-label">
                        <label>degrees</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="report-sheet">
              <div class="report-container">
                <div class="sheet-body" style="grid-template-columns: 50% 12.5% 12.5% 12.5% 12.5%">
                  <div class="section-label">
                    <label>Acceptance Criteria</label>
                  </div>
                  <div class="section-label">
                    <label>Cosine Curve</label>
                  </div>
                  <div class="section-label">
                    <label>
                      S
                      <sub>max</sub> (mm)
                    </label>
                  </div>
                  <div class="section-label">
                    <label>S (mm)</label>
                  </div>
                  <div class="section-label">
                    <label>Inspection Result</label>
                  </div>
                  <div class="form-item" style="grid-row: span 2">
                    <div
                      class="form-item-label"
                      style="
                        grid-column: span 2;
                        display: flex;
                        height: auto;
                        padding-left: 30px;"
                    >
                      <label id="fixed-font">
                        The maximum out of plane deflection, where the greatest
                        deviation of the bottom from the optimum cosine curve
                        occurs over the shortest interval between measurements,
                        shell not exceed the maximum permissible out-of-plane
                        deflection calculated from formula in B3.2
                      </label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-label" style="grid-column: span 2">
                      <label id="fixed-font" style="text-align: center">Valid</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-unit" style="grid-column: span 2; width: auto">
                      <label v-if="!acceptanceDetermination.s_value">-</label>
                      <label v-if="acceptanceDetermination.s_value">
                        {{
                        acceptanceDetermination.s_value.toFixed(2)
                        }}
                      </label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-unit" style="grid-column: span 2; width: auto">
                      <label v-if="!acceptanceDetermination.st_value">-</label>
                      <label v-if="acceptanceDetermination.st_value">
                        {{
                        acceptanceDetermination.st_value.toFixed(2)
                        }}
                      </label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-unit" style="grid-column: span 2; width: auto">
                      <label v-if="!acceptanceDetermination.insp_result">-</label>
                      <label v-if="acceptanceDetermination.insp_result">
                        {{
                        acceptanceDetermination.insp_result
                        }}
                      </label>
                    </div>
                  </div>

                  <div class="form-item">
                    <div class="form-item-label" style="grid-column: span 2">
                      <label id="fixed-font" style="text-align: center">Invalid</label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-unit" style="grid-column: span 2; width: auto">
                      <label v-if="!acceptanceDetermination.s_max_mm">-</label>
                      <label v-if="acceptanceDetermination.s_max_mm">
                        {{
                        acceptanceDetermination.s_max_mm.toFixed(2)
                        }}
                      </label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-unit" style="grid-column: span 2; width: auto">
                      <label v-if="!acceptanceDetermination.st_value">-</label>
                      <label v-if="acceptanceDetermination.st_value">
                        {{
                        acceptanceDetermination.st_value.toFixed(2)
                        }}
                      </label>
                    </div>
                  </div>
                  <div class="form-item">
                    <div class="form-item-unit" style="grid-column: span 2; width: auto">
                      <label v-if="!acceptanceDetermination.insp_result_invalid">-</label>
                      <label v-if="acceptanceDetermination.insp_result_invalid">
                        {{
                        acceptanceDetermination.insp_result_invalid
                        }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="report-sheet">
              <div class="report-container">
                <div class="sheet-body" style="grid-template-columns: 100%">
                  <div class="section-label">
                    <label>Settlement Summary and Recommendation</label>
                  </div>
                  <div class="form-item">
                    <div class="form-item-label" style="grid-column: span 2">
                      <label style="text-align: center">ยังไม่มี API ไม่มีที่ลงใน Database</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <noticeMessage
          v-if="!this.acceptDetInfo"
          icon="las la-plus"
          message="No evaluation points created. Please create points in 'Settlement Evaluation Data' Tab. "
        />
      </div>
      <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
    </div>
    <SelectInspRecord v-if="this.id_inspection_record == ''" />
    <popupAdd v-if="isAdd == true" @closePopup="CLOSE_ADD()" :info="this.current_view" />
    <popupEditUIActive
      v-if="isEdit == true"
      @closePopup="CLOSE_EDIT()"
      :info="this.shellPointList"
    />
  </div>
</template>

<script>
//API
import axios from "/axios.js";
import moment from "moment";

//Components
import "devextreme/dist/css/dx.light.css";
import appInstruction from "@/components/app-structures/app-instruction-dialog.vue";
import InspectionRecordPanel from "@/views/Applications/TankList/Pages/inspection-record-panel.vue";
import VueTabsChrome from "vue-tabs-chrome";
import SelectInspRecord from "@/components/select-insp-record.vue";
import popupAdd from "@/views/Applications/TankList/Pages/Evaluation/ShellSettlement-add.vue";
import popupEditUIActive from "@/views/Applications/TankList/Pages/Evaluation/ShellSettlement-edit-ui-active.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import noticeMessage from "@/components/app-structures/app-notice-message.vue";

//Charts
import chartShellSettlement1 from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-shell-settlement-level-cosine-line.vue";
import chartShellSettlement2 from "@/views/Applications/TankList/Pages/Evaluation/charts/chart-shell-settlement-ofp_set-ofp_def-line.vue";

//DataGrid
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
  DxDataGrid,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxEditing,
  DxButton,
  DxHeaderFilter,
  DxFilterRow,
  DxToolbar,
  DxItem
} from "devextreme-vue/data-grid";

export default {
  name: "ShellSettlementView",
  components: {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxEditing,
    DxButton,
    DxHeaderFilter,
    DxFilterRow,
    DxToolbar,
    DxItem,
    appInstruction,
    InspectionRecordPanel,
    VueTabsChrome,
    SelectInspRecord,
    popupAdd,
    popupEditUIActive,
    contentLoading,
    noticeMessage,
    chartShellSettlement1,
    chartShellSettlement2,
    DxFileUploader
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_INAPP", {
      name: "Tank Management",
      icon: "/img/icon_menu/tank/tank.png"
    });
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "Evaluation",
      subpageInnerName: "Shell Settlement"
    });
  },
  data() {
    return {
      id_inspection_record: "",
      current_view: "",
      shellPointList: [],
      settlementCalPointList: [],
      acceptDetInfo: "",
      isAdd: false,
      isEdit: false,
      isLoading: false,
      upload_flag: true,
      dataGridAttributes: {
        class: "data-grid-style"
      },
      pagePanelHiding: false,
      tabCurrent: "data",
      tabs: [
        {
          label: "Settlement Evaluation Data",
          key: "data",
          closable: false
        },
        {
          label: "Settlement Calculation (API 653)",
          key: "cal",
          closable: false
        },
        {
          label: "Acceptance Determination",
          key: "ad",
          closable: false
        }
      ],
      formData: {
        item: null,
        multi: null
      },
      chart_1: 0,
      chart_2: 0,
      chart_img_1: "",
      chart_img_2: ""
    };
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
    shellPointIsEmpty() {
      return this.shellPointList;
    },
    acceptanceDetermination() {
      if (this.acceptDetInfo) {
        var info = {
          l_value: this.acceptDetInfo.l_value,
          tank_height_ft: this.acceptDetInfo.tank_height_ft,
          points: this.acceptDetInfo.points,
          deflection_ft: this.acceptDetInfo.deflection_ft,
          deflection_mm: this.acceptDetInfo.deflection_mm,
          k_value: this.acceptDetInfo.k_value,
          s_arc: this.acceptDetInfo.s_arc,
          diameter_ft: this.acceptDetInfo.diameter_ft,
          yield: this.acceptDetInfo.yield,
          e: this.acceptDetInfo.e,
          s_max_in: this.acceptDetInfo.s_max_in,
          s_max_mm: this.acceptDetInfo.s_max_mm,
          ui_max: this.acceptDetInfo.ui_max,
          ui_next_max: this.acceptDetInfo.ui_next_max,
          ui_before_max: this.acceptDetInfo.ui_before_max,
          st: this.acceptDetInfo.st,
          r_2: this.acceptDetInfo.r_2,
          predicted_tilt: this.acceptDetInfo.predicted_tilt,
          direction_degrees_cw_pi: this.acceptDetInfo.direction_degrees_cw_pi,
          s_value: this.acceptDetInfo.s_value,
          st_value: this.acceptDetInfo.st_value,
          insp_result: this.acceptDetInfo.insp_result,
          insp_result_invalid: this.acceptDetInfo.insp_result_invalid
        };
        return info;
      } else return "no data";
    }
  },
  watch: {
    tabCurrent() {
      if (this.tabCurrent == "data") {
        this.VIEW_ITEM(this.current_view);
      } else if (this.tabCurrent == "cal") {
        this.FETCH_CALC();
        this.FETCH_CHART_1();
        this.FETCH_CHART_2();
      } else if (this.tabCurrent == "ad") {
        this.FETCH_ACCPT();
      } else {
        console.log("tab select error");
      }
    },
    current_view() {
      this.tabCurrent = "data";
      this.VIEW_ITEM(this.current_view);
      this.shellPointList = [];
      this.settlementCalPointList = [];
    }
  },
  mounted() {},
  methods: {
    UPLOAD() {
      this.upload_flag = false;
    },
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Projects.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    VIEW_ITEM(item) {
      //FETCH EVA POINTS
      console.log("==> FETCH: Eva Points");
      this.isLoading = true;
      this.id_inspection_record = item.id_inspection_record;
      this.current_view = item;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: item.id_inspection_record
        }
      })
        .then(res => {
          console.log("==> RES: Eval Points");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Eval Points");
            this.shellPointList = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CALC() {
      console.log("==> FETCH: Calculation");
      this.isLoading = true;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-cal",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: this.id_inspection_record
        }
      })
        .then(res => {
          console.log("==> RES: Calculation");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Calculation");
            this.settlementCalPointList = res.data;
            console.log("==> SUCCESS: formData Multi Edit fetched");
            this.formData.multi = res.data[0];
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_ACCPT() {
      console.log("==> FETCH: Acceptance Determination");
      this.isLoading = true;
      const id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "shell-settlement/get-shell-settlement-accept",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: {
          id_tag: id_tag,
          id_inspection_record: this.id_inspection_record
        }
      })
        .then(res => {
          console.log("==> RES: Acceptance Determination");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Acceptance Determination");
            this.acceptDetInfo = res.data[0];
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    EDIT_CALC() {
      console.log("==> FETCH: Edit Multi Item");
      this.isLoading = true;
      axios({
        method: "put",
        url: "shell-settlement/edit-shell-settlement-cal",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.formData.multi
      })
        .then(res => {
          console.log("==> RES: Edit Multi Item");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Edit Multi Item");
            this.FETCH_CALC();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    EDIT_ACCPT() {
      console.log("==> FETCH: Edit Acceptance Criteria");
      this.isLoading = true;
      axios({
        method: "put",
        url: "shell-settlement/edit-shell-settlement-acc",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: this.acceptDetInfo
      })
        .then(res => {
          console.log("==> RES: Edit Acceptance Criteria");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Edit Acceptance Criteria");
            this.FETCH_ACCPT();
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    OPEN_ADD() {
      this.isAdd = true;
    },
    CLOSE_ADD() {
      this.VIEW_ITEM(this.current_view);
      this.isAdd = false;
    },
    OPEN_EDIT() {
      this.isEdit = true;
    },
    CLOSE_EDIT() {
      this.VIEW_ITEM(this.current_view);
      this.isEdit = false;
    },
    UPDATE(e) {
      console.log(e);
      axios({
        method: "put",
        url: "shell-settlement/edit-shell-settlement",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: e.data
      })
        .then(res => {
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log(res.data);
            this.VIEW_ITEM(this.current_view);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    DELETE(e) {
      console.log(e);
    },
    IS_VISIBLE_ADD() {
      if (this.id_inspection_record == 0) {
        return false;
      } else {
        return true;
      }
    },
    SHOW_HIDE_PANEL() {
      this.pagePanelHiding = !this.pagePanelHiding;
    },
    DATE_FORMAT(d) {
      return moment(d).format("LL");
    },
    DELETE_POINT() {
      this.$ons.notification.confirm("Confirm delete?").then(res => {
        if (res == 1) {
          axios({
            method: "delete",
            url: "/shell-settlement/delete-shell-settlement",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
            },
            data: {
              id_inspection_record: this.current_view.id_inspection_record
            }
          })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                this.$ons.notification.alert("Points Deleted");
                this.VIEW_ITEM(this.current_view);
              }
            })
            .catch(error => {
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        }
      });
    },
    FETCH_CHART_1() {
      console.log("==> FETCH: Chart 1");
      var id = this.current_view.id_inspection_record;
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "chart-image-file/get-chart-image-file-by-ir-id-type?id=" +
          id +
          "&type=shell_settlement_1",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("==> RES: Chart 1");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.chart_1 = res.data[0].id_chart;
            this.chart_img_1 = res.data[0].file_path;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CHART_2() {
      console.log("==> FETCH: Chart 2");
      var id = this.current_view.id_inspection_record;
      this.isLoading = true;
      axios({
        method: "get",
        url:
          "chart-image-file/get-chart-image-file-by-ir-id-type?id=" +
          id +
          "&type=shell_settlement_2",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("==> RES: Chart 2");
          console.log(res.data);
          if (res.status == 200 && res.data) {
            this.chart_2 = res.data[0].id_chart;
            this.chart_img_2 = res.data[0].file_path;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    UPLOAD_CHART(type) {
      var formData = new FormData();
      formData.append(
        "id_inspection_record",
        this.current_view.id_inspection_record
      );
      formData.append("type", type);
      formData.append("created_by", this.$store.state.user.id_account);
      formData.append("file", this.file);
      axios({
        method: "post",
        url: "chart-image-file/add-chart-image-file",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        },
        data: formData
      })
        .then(res => {
          //console.log(res);
          if (res.status == 201) {
            console.log("UPLOAD COMPLETED");
            this.FETCH_CHART_1();
            this.FETCH_CHART_2();
          }
        })
        .catch(error => {
          console.log(error);
          this.$ons.notification.alert(
            "Only image files are allowed. [ jpg, jpeg, png, gif, bmp ]"
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    VALUE_CHANGE(e) {
      //console.log("fileReader e data:");
      //console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {};
      this.file = e.value[0];
      this.file_name = e.value[0].name;
      this.UPLOAD_CHART("shell_settlement_1");
    },
    VALUE_CHANGE2(e) {
      //console.log("fileReader e data:");
      //console.log(e);
      let reader = new FileReader();
      reader.readAsDataURL(e.value[0]);
      reader.onload = () => {};
      this.file = e.value[0];
      this.file_name = e.value[0].name;
      this.UPLOAD_CHART("shell_settlement_2");
    },
    DELETE_CHART(i) {
      //console.warn(i);
      this.$ons.notification.confirm("Confirm delete?").then(res => {
        if (res == 1) {
          var id = 0;
          if (i == 1) {
            id = this.chart_1;
          } else {
            id = this.chart_2;
          }
          //console.warn(id);
          axios({
            method: "delete",
            url: "/chart-image-file/delete-chart-image-file?id=" + id,
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
          })
            .then(res => {
              console.log(res);

              if (res.status == 200) {
                if (i == 1) {
                  this.chart_1 = 0;
                  //this.FETCH_CHART_1();
                } else {
                  //this.FETCH_CHART_2();
                  this.chart_2 = 0;
                }
              }
            })
            .catch(error => {
              this.isLoading = false;
              this.$ons.notification.alert(
                error.code + " " + error.response.status + " " + error.message
              );
            })
            .finally(() => {});
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 201px calc(100% - 201px);
}

.page-container-hide {
  grid-template-columns: 41px calc(100% - 41px);
}

.list-page {
  position: relative;
  overflow-y: auto;
  .list {
    margin: -20px -20px 20px -20px;
  }
  .content {
    width: 100%;
    // width: calc(100% - 20px);
    // display: grid;
    // grid-template-columns: 600px calc(100% - 600px);
    // grid-gap: 20px;
    display: block;
  }
}

.data-grid-style {
  height: 100%;
  border-radius: 6px;
}

.app-instruction {
  .img-box {
    width: auto;
    margin: 10px 0;
    border: 1px solid #f0f0d2;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.instruction-table {
  // width: 100%;
  margin-top: 10px;
}

.tab-wrapper {
  height: 48px;
  margin: -20px -20px 20px -20px;
}
.vue-tabs-chrome {
  padding-top: 10px;
  background-color: #d9d9d9;
  font-size: 12px;
  font-weight: 500;
}
.info-tab-display {
  display: flex;
}
.report-sheet {
  max-width: 100%;
  width: 100%;
  font-family: $web-default-font;
  box-shadow: none;
  padding: 0 !important;
  margin-top: 0;
  margin-bottom: 20px;

  .report-container {
    .header {
      .title {
        grid-column: span 4;
      }
    }
    .sheet-body {
      grid-template-columns: repeat(4, 25%);
      border-radius: 6px;
      overflow: hidden;

      .section-label {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        label {
          font-size: 12px;
          text-transform: none;
          user-select: text;
          cursor: text;
        }
      }
      .form-item {
        .form-item-label {
          height: 50px;
          background-color: #fff;
          border: 0.5px solid #000;
          label {
            user-select: text;
            cursor: text;
            font-weight: 700;
            width: 100%;
            text-align: center;
          }
        }
        .form-item-value {
          grid-column: span 1;
          border: 0.5px solid #000;
          background-color: rgba(255, 255, 0, 0.117);
          input {
            font-weight: 700;

            height: 50px;
            text-align: center;
            // margin-right: 20px;
            background-color: transparent;
          }
          label {
            margin: 0 auto;
            font-weight: 600;
          }
        }
        .form-item-textarea {
          textarea {
            height: auto;
            max-height: 80px;
            overflow-y: auto;
          }
        }
      }
      .form-item-picture-log .img-box {
        height: 244px;
      }
    }
  }
}

.tab1-grid {
  display: flex;
  // display: grid;
  // grid-gap: 20px;
  // width: 100%;
  // grid-template-columns: auto 500px;
}

.tab2-grid {
  .content {
    .report-sheet {
      margin-bottom: 0;
      .report-container {
        .header {
          .title {
          }
        }
        .sheet-body {
          margin-bottom: 20px;
          .form-item {
            .form-item-label {
              padding: 0;
            }
            .form-item-value {
              max-width: inherit;
              border-right: 0.5px solid #000;
              height: 50px;
              padding: 0;
              input {
                border: unset;
                padding: 0;
                max-width: 100%;
              }
            }
          }
        }
        .sheet-body:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .app-instruction {
    // display: grid;
    // grid-template-columns: 50% 50%;
    // grid-gap: 20px;
    // width: calc(100% - 40px);
    // margin-bottom: 20px;
  }
}
@media (max-width: 1600px) {
  .tab3-grid {
    .content {
      .report-sheet {
        .report-container {
          .header {
            .title {
              grid-column: span 4;
            }
          }
          .sheet-body {
            grid-template-columns: 35% 35% 30%;
            border: 0.5px solid #000;

            .content-wrapper {
              border: 0.5px solid #000;
              padding: 20px;
            }

            .form-item {
              display: grid;
              grid-template-columns: auto 120px;
              .form-item-label {
                height: 50px;
                background-color: #fff;
                border: 0;
                #fixed-font {
                  font-size: 12px;
                }
                label {
                  user-select: text;
                  cursor: text;
                  font-weight: 500;
                  width: 100%;
                  text-align: left;
                  font-size: 10px;

                  b {
                    user-select: text;
                    cursor: text;
                    font-size: 14px;
                  }
                }
              }
              .form-item-value {
                grid-column: span 1;
                background-color: #fff;
                border: 0;

                input {
                  font-weight: 700;
                  border: 1px solid #000;
                  background-color: rgba(255, 255, 0, 0.117);
                  height: 36px;
                  text-align: center;
                  // margin-right: 20px;
                  border-radius: 4px;
                  max-width: 120px;
                }

                label {
                  margin: 0 auto;
                  font-weight: 600;
                }
              }

              .form-item-unit {
                border: 0;

                label {
                  user-select: text;
                  cursor: text;
                  line-height: 36px;
                  width: -webkit-fill-available;
                  text-align: center;
                  font-weight: 700;
                  border: 1px solid #000;
                  background-color: #fff;
                  height: 36px;
                  text-align: center;
                  // margin-right: 20px;
                  border-radius: 4px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.tab3-grid {
  .content {
    // width: calc(100% - 20px);
    // display: grid;
    // grid-template-columns: 70% 30%;
    // grid-gap: 20px;
    .report-sheet {
      .report-container {
        .header {
          .title {
            grid-column: span 4;
          }
        }
        .sheet-body {
          grid-template-columns: 35% 35% 30%;
          border: 0.5px solid #000;

          .content-wrapper {
            border: 0.5px solid #000;
            padding: 20px;
          }

          .form-item {
            display: grid;
            grid-template-columns: auto 120px;
            .form-item-label {
              height: 50px;
              background-color: #fff;
              border: 0;
              label {
                user-select: text;
                cursor: text;
                font-weight: 500;
                width: 100%;
                text-align: left;
                b {
                  user-select: text;
                  cursor: text;
                  font-size: 14px;
                }
              }
            }
            .form-item-value {
              grid-column: span 1;
              background-color: #fff;
              border: 0;

              input {
                font-weight: 700;
                border: 1px solid #000;
                background-color: rgba(255, 255, 0, 0.117);
                height: 36px;
                text-align: center;
                // margin-right: 20px;
                border-radius: 4px;
                max-width: 120px;
              }

              label {
                margin: 0 auto;
                font-weight: 600;
              }
            }

            .form-item-unit {
              border: 0;

              label {
                user-select: text;
                cursor: text;
                line-height: 36px;
                width: -webkit-fill-available;
                text-align: center;
                font-weight: 700;
                border: 1px solid #000;
                background-color: #fff;
                height: 36px;
                text-align: center;
                // margin-right: 20px;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
}

.tab-top-page {
  background-color: #d9d9da;
}

.table-wrapper {
  height: auto;
}

.app-content-loading {
  top: 70px;
  left: 0;
}

.app-notice-message-wrapper {
  width: 100%;
  height: 100%;
  position: unset;
  background-color: #ccc;
}

@media screen and (max-width: 1536px) {
  .tab1-grid {
    display: block;
  }
  .app-instruction {
    padding-left: 0 !important;
  }
}
.upload-graph {
  justify-content: right;
  align-items: right;
  align-content: right;
}
#upload {
  margin-top: 10px;
  background-color: #f6f6f6;
  border: 1px solid #303030;
  align-items: right;
  height: 15px;
  width: 225px;
  i {
    color: #303030;
  }
  span {
    color: #303030;
  }
}
#upload:hover,
#upload:active {
  background-color: #140a4b;
  i {
    color: #ffffff;
  }
  span {
    color: #ffffff;
  }
}
</style>