function showFeedBack(input, valid, message) {
	let validClass = valid ? "is-valid" : "is-invalid";
	let div = valid
		? input.nextAll("div.valid-feedback")
		: input.nextAll("div.invalid-feedback");
	input.nextAll("div").removeClass("d-block");
	div.removeClass("d-none").addClass("d-block");
	input.removeClass("is-valid is-invalid").addClass(validClass);
	if (message) {
		div.empty();
		div.append(message);
	}
}

function defaultCheckElement(event) {
	this.value = this.value.trim();
	if (!this.checkValidity()) {
		showFeedBack($(this), false);
	} else {
		showFeedBack($(this), true);
	}
}

function newStoreValidation(handler) {
	let form = document.forms.fNewStore;
	$(form).attr("novalidate", true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		if (!this.fcsLongitude.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fcsLongitude), false);
			firstInvalidElement = this.fcsLongitude;
		} else {
			showFeedBack($(this.fcsLongitude), true);
		}

		if (!this.fcsLatitude.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fcsLatitude), false);
			firstInvalidElement = this.fcsLatitude;
		} else {
			showFeedBack($(this.fcsLatitude), true);
		}

		if (!this.fcsPhone.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fcsPhone), false);
			firstInvalidElement = this.fcsPhone;
		} else {
			showFeedBack($(this.fcsPhone), true);
		}

		if (!this.fcsAddress.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fcsAddress), false);
			firstInvalidElement = this.fcsAddress;
		} else {
			showFeedBack($(this.fcsAddress), true);
		}

		if (!this.fcsName.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fcsName), false);
			firstInvalidElement = this.fcsName;
		} else {
			showFeedBack($(this.fcsName), true);
		}

		if (!this.fcsCif.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fcsCif), false);
			firstInvalidElement = this.fcsCif;
		} else {
			showFeedBack($(this.fcsCif), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(
				this.fcsCif.value,
				this.fcsName.value,
				this.fcsAddress.value,
				this.fcsPhone.value,
				this.fcsLatitude.value,
				this.fcsLongitude.value
			);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener("reset", function (event) {
		let feedDivs = $(this).find("div.valid-feedback, div.invalid-feedback");
		feedDivs.removeClass("d-block").addClass("d-none");
		let inputs = $(this).find("input");
		inputs.removeClass("is-valid is-invalid");
		let selects = $(this).find("select");
		selects.removeClass("is-valid is-invalid");
	});

	$(form.fcsCif).change(defaultCheckElement);
	$(form.fcsName).change(defaultCheckElement);
	$(form.fcsAddress).change(defaultCheckElement);
	$(form.fcsPhone).change(defaultCheckElement);
	$(form.fcsLatitude).change(defaultCheckElement);
	$(form.fcsLongitude).change(defaultCheckElement);
}

function removeStoreValidation(handler) {
	let form = document.forms.fRemStore;
	$(form).attr("novalidate", true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		if (this.frsStore.value === "") {
			isValid = false;
			showFeedBack($(this.frsStore), false);
			firstInvalidElement = this.frsStore;
		} else {
			showFeedBack($(this.frsStore), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(this.frsStore.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	$(form.frsStore).change(defaultCheckElement);
}

function newProductValidation(type = "Default", handler) {
	let form = document.forms.fNewProduct;
	$(form).attr("novalidate", true);

	let validation;
	$(form).off("submit", this, validation);

	if (type == "Default") {
		validation = function (event) {
			$("#fcpType").focus();
			$("#typeOfProduct p").removeClass("text-muted");
			$("#typeOfProduct p").addClass("text-danger fw-bolder");
			setTimeout(() => {
				$("#typeOfProduct p").removeClass("text-danger fw-bolder");
				$("#typeOfProduct p").addClass("text-muted");
			}, 2000);
			event.preventDefault();
			event.stopPropagation();
		};
	}

	if (type == "Book") {
		validation = function (event) {
			let isValid = true;
			let firstInvalidElement = null;

			if (!this.fcpVolume.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpVolume), false);
				firstInvalidElement = this.fcpVolume;
			} else {
				showFeedBack($(this.fcpVolume), true);
			}

			if (!this.fcpGenre.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpGenre), false);
				firstInvalidElement = this.fcpGenre;
			} else {
				showFeedBack($(this.fcpGenre), true);
			}

			if (!this.fcpLenguage.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpLenguage), false);
				firstInvalidElement = this.fcpLenguage;
			} else {
				showFeedBack($(this.fcpLenguage), true);
			}

			if (!this.fcpAuthor.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpAuthor), false);
				firstInvalidElement = this.fcpAuthor;
			} else {
				showFeedBack($(this.fcpAuthor), true);
			}

			if (!this.fcpEditorial.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpEditorial), false);
				firstInvalidElement = this.fcpEditorial;
			} else {
				showFeedBack($(this.fcpEditorial), true);
			}

			if (!this.fcpImage.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpImage), false);
				firstInvalidElement = this.fcpImage;
			} else {
				showFeedBack($(this.fcpImage), true);
			}

			if (!this.fcpTax.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpTax), false);
				firstInvalidElement = this.fcpTax;
			} else {
				showFeedBack($(this.fcpTax), true);
			}

			if (!(parseFloat(this.fcpPrice.value) >= 0.01)) {
				isValid = false;
				showFeedBack($(this.fcpPrice), false);
				firstInvalidElement = this.fcpPrice;
			} else {
				showFeedBack($(this.fcpPrice), true);
			}

			if (!this.fcpName.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpName), false);
				firstInvalidElement = this.fcpName;
			} else {
				showFeedBack($(this.fcpName), true);
			}

			if (!this.fcpSerial.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpSerial), false);
				firstInvalidElement = this.fcpSerial;
			} else {
				showFeedBack($(this.fcpSerial), true);
			}

			let dirCheckbox = $('#checkCategories input');
			let selectCategories = [];

			for (let i = 0; i < dirCheckbox.length; i++) {
				if (dirCheckbox[i].checked) selectCategories.push(dirCheckbox[i].value);
			}

			if (!isValid) {
				firstInvalidElement.focus();
			} else {
				if (this.fcpEditorial.value == "") this.fcpEditorial.value = undefined;
				if (this.fcpAuthor.value == "") this.fcpAuthor.value = undefined;
				if (this.fcpGenre.value == "") this.fcpGenre.value = undefined;
				handler(
					"Book",
					this.fcpSerial.value,
					this.fcpName.value,
					this.fcpPrice.value,
					this.fcpTax.value,
					this.fcpImage.value == "" ? undefined : [this.fcpImage.value],
					selectCategories,
					this.fcpEditorial.value,
					this.fcpAuthor.value,
					this.fcpLenguage.value,
					this.fcpGenre.value,
					this.fcpVolume.value
				);
			}

			event.preventDefault();
			event.stopPropagation();
		};
	} else if (type == "Music") {
		validation = function (event) {
			let isValid = true;
			let firstInvalidElement = null;

			if (!this.fcpLength.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpLength), false);
				firstInvalidElement = this.fcpLength;
			} else {
				showFeedBack($(this.fcpLength), true);
			}

			if (!this.fcpGenre.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpGenre), false);
				firstInvalidElement = this.fcpGenre;
			} else {
				showFeedBack($(this.fcpGenre), true);
			}

			if (!this.fcpBrand.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpBrand), false);
				firstInvalidElement = this.fcpBrand;
			} else {
				showFeedBack($(this.fcpBrand), true);
			}

			if (!this.fcpImage.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpImage), false);
				firstInvalidElement = this.fcpImage;
			} else {
				showFeedBack($(this.fcpImage), true);
			}

			if (!this.fcpTax.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpTax), false);
				firstInvalidElement = this.fcpTax;
			} else {
				showFeedBack($(this.fcpTax), true);
			}

			if (!(parseFloat(this.fcpPrice.value) >= 0.01)) {
				isValid = false;
				showFeedBack($(this.fcpPrice), false);
				firstInvalidElement = this.fcpPrice;
			} else {
				showFeedBack($(this.fcpPrice), true);
			}

			if (!this.fcpName.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpName), false);
				firstInvalidElement = this.fcpName;
			} else {
				showFeedBack($(this.fcpName), true);
			}

			if (!this.fcpSerial.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpSerial), false);
				firstInvalidElement = this.fcpSerial;
			} else {
				showFeedBack($(this.fcpSerial), true);
			}

			let dirCheckbox = $('#checkCategories input');
			let selectCategories = [];

			for (let i = 0; i < dirCheckbox.length; i++) {
				if (dirCheckbox[i].checked) selectCategories.push(dirCheckbox[i].value);
			}

			if (!isValid) {
				firstInvalidElement.focus();
			} else {
				if (this.fcpBrand.value == "") this.fcpBrand.value = undefined;
				if (this.fcpGenre.value == "") this.fcpGenre.value = undefined;
				handler(
					"Music",
					this.fcpSerial.value,
					this.fcpName.value,
					this.fcpPrice.value,
					this.fcpTax.value,
					this.fcpImage.value == "" ? undefined : [this.fcpImage.value],
					selectCategories,
					this.fcpBrand.value,
					this.fcpGenre.value,
					this.fcpLength.value
				);
			}

			event.preventDefault();
			event.stopPropagation();
		};
	} else if (type == "Monitor") {
		validation = function (event) {
			let isValid = true;
			let firstInvalidElement = null;

			if (!this.fcpScreen.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpScreen), false);
				firstInvalidElement = this.fcpScreen;
			} else {
				showFeedBack($(this.fcpScreen), true);
			}

			if (!this.fcpColor.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpColor), false);
				firstInvalidElement = this.fcpColor;
			} else {
				showFeedBack($(this.fcpColor), true);
			}

			if (!this.fcpSize.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpSize), false);
				firstInvalidElement = this.fcpSize;
			} else {
				showFeedBack($(this.fcpSize), true);
			}

			if (!this.fcpRefresh.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpRefresh), false);
				firstInvalidElement = this.fcpRefresh;
			} else {
				showFeedBack($(this.fcpRefresh), true);
			}

			if (!this.fcpBrand.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpBrand), false);
				firstInvalidElement = this.fcpBrand;
			} else {
				showFeedBack($(this.fcpBrand), true);
			}

			if (!this.fcpImage.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpImage), false);
				firstInvalidElement = this.fcpImage;
			} else {
				showFeedBack($(this.fcpImage), true);
			}

			if (!this.fcpTax.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpTax), false);
				firstInvalidElement = this.fcpTax;
			} else {
				showFeedBack($(this.fcpTax), true);
			}

			if (!(parseFloat(this.fcpPrice.value) >= 0.01)) {
				isValid = false;
				showFeedBack($(this.fcpPrice), false);
				firstInvalidElement = this.fcpPrice;
			} else {
				showFeedBack($(this.fcpPrice), true);
			}

			if (!this.fcpName.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpName), false);
				firstInvalidElement = this.fcpName;
			} else {
				showFeedBack($(this.fcpName), true);
			}

			if (!this.fcpSerial.checkValidity()) {
				isValid = false;
				showFeedBack($(this.fcpSerial), false);
				firstInvalidElement = this.fcpSerial;
			} else {
				showFeedBack($(this.fcpSerial), true);
			}

			let dirCheckbox = $('#checkType input');
			let selectType = [];

			for (let i = 0; i < dirCheckbox.length; i++) {
				if (dirCheckbox[i].checked) selectType.push(dirCheckbox[i].value);
			}

			dirCheckbox = $('#checkCategories input');
			let selectCategories = [];

			for (let i = 0; i < dirCheckbox.length; i++) {
				if (dirCheckbox[i].checked) selectCategories.push(dirCheckbox[i].value);
			}

			if (!isValid) {
				firstInvalidElement.focus();
			} else {
				if (this.fcpBrand.value == "") this.fcpBrand.value = undefined;
				if (this.fcpColor.value == "") this.fcpColor.value = undefined;
				handler(
					"Monitor",
					this.fcpSerial.value,
					this.fcpName.value,
					this.fcpPrice.value,
					this.fcpTax.value,
					this.fcpImage.value == "" ? undefined : [this.fcpImage.value],
					selectCategories,
					this.fcpBrand.value,
					this.fcpRefresh.value,
					this.fcpSize.value,
					this.fcpColor.value,
					selectType.length == 0 ? undefined : selectType,
					this.fcpScreen.value,
				);
			}

			event.preventDefault();
			event.stopPropagation();
		};
	}

	$(form).on("submit", this, validation);

	form.addEventListener("reset", function (event) {
		let feedDivs = $(this).find("div.valid-feedback, div.invalid-feedback");
		feedDivs.removeClass("d-block").addClass("d-none");
		let inputs = $(this).find("input");
		inputs.removeClass("is-valid is-invalid");
		let selects = $(this).find("select");
		selects.removeClass("is-valid is-invalid");
	});

	$(form.fcpSerial).change(defaultCheckElement);
	$(form.fcpName).change(defaultCheckElement);
	$(form.fcpPrice).change(defaultCheckElement);
	$(form.fcpTax).change(defaultCheckElement);
	$(form.fcpImage).change(defaultCheckElement);
	$(form.fcpEditorial).change(defaultCheckElement);
	$(form.fcpAuthor).change(defaultCheckElement);
	$(form.fcpLenguage).change(defaultCheckElement);
	$(form.fcpGenre).change(defaultCheckElement);
	$(form.fcpVolume).change(defaultCheckElement);
	$(form.fcpBrand).change(defaultCheckElement);
	$(form.fcpLength).change(defaultCheckElement);
	$(form.fcpRefresh).change(defaultCheckElement);
	$(form.fcpSize).change(defaultCheckElement);
	$(form.fcpColor).change(defaultCheckElement);
	$(form.fcpScreen).change(defaultCheckElement);
}

function removeProductValidation(handler) {
	let form = document.forms.fRemProduct;
	$(form).attr("novalidate", true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		if (this.frsProduct.value === "") {
			isValid = false;
			showFeedBack($(this.frsProduct), false);
			firstInvalidElement = this.frsProduct;
		} else {
			showFeedBack($(this.frsProduct), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(this.frsProduct.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	$(form.frsProduct).change(defaultCheckElement);
}

function newCategoryValidation(handler) {
	let form = document.forms.fNewCategory;
	$(form).attr("novalidate", true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		if (!this.fccTitle.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fccTitle), false);
			firstInvalidElement = this.fccTitle;
		} else {
			showFeedBack($(this.fccTitle), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(
				this.fccTitle.value
			);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener("reset", function (event) {
		let feedDivs = $(this).find("div.valid-feedback, div.invalid-feedback");
		feedDivs.removeClass("d-block").addClass("d-none");
		let inputs = $(this).find("input");
		inputs.removeClass("is-valid is-invalid");
		let selects = $(this).find("select");
		selects.removeClass("is-valid is-invalid");
	});

	$(form.fccTitle).change(defaultCheckElement);
}

function removeCategoryValidation(handler) {
	let form = document.forms.fRemCategory;
	$(form).attr("novalidate", true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		if (this.frcCategory.value === "") {
			isValid = false;
			showFeedBack($(this.frcCategory), false);
			firstInvalidElement = this.frcCategory;
		} else {
			showFeedBack($(this.frcCategory), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(this.frcCategory.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	$(form.frcCategory).change(defaultCheckElement);
}

function addStockValidation(handler) {
	let form = document.forms.fAddStock;
	$(form).attr("novalidate", true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		if (this.fasStore.value === "") {
			isValid = false;
			showFeedBack($(this.fasStore), false);
			firstInvalidElement = this.fasStore;
		} else {
			showFeedBack($(this.fasStore), true);
		}

		if (this.fasProduct.value === "") {
			isValid = false;
			showFeedBack($(this.fasProduct), false);
			firstInvalidElement = this.fasProduct;
		} else {
			showFeedBack($(this.fasProduct), true);
		}

		if (!this.fasStock.checkValidity()) {
			isValid = false;
			showFeedBack($(this.fasStock), false);
			firstInvalidElement = this.fasStock;
		} else {
			showFeedBack($(this.fasStock), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(
				this.fasProduct.value,
				this.fasStore.value,
				this.fasStock.value
			);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener("reset", function (event) {
		let feedDivs = $(this).find("div.valid-feedback, div.invalid-feedback");
		feedDivs.removeClass("d-block").addClass("d-none");
		let inputs = $(this).find("input");
		inputs.removeClass("is-valid is-invalid");
		let selects = $(this).find("select");
		selects.removeClass("is-valid is-invalid");
	});

	$(form.fasProduct).change(defaultCheckElement);
	$(form.fasStock).change(defaultCheckElement);
	$(form.fasStore).change(defaultCheckElement);
}

export {
	newStoreValidation,
	removeStoreValidation,
	newProductValidation,
	removeProductValidation,
	newCategoryValidation,
	removeCategoryValidation,
	addStockValidation
};
